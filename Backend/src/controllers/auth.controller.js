const userModel = require('../models/user.model');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const tokenBlacklistModel = require('../models/blacklist.model');

// Cookie flags for the auth token.
// In production (frontend and backend on different domains) the cookie must
// be sameSite: 'none' + secure: true or the browser will silently refuse to
// send it on cross-site requests. In local dev (same-site http://localhost)
// 'lax' + non-secure is used since secure cookies require HTTPS.
const isProduction = process.env.NODE_ENV === 'production';
const cookieOptions = {
    httpOnly: true,
    secure: isProduction,
    sameSite: isProduction ? 'none' : 'lax',
    maxAge: 24 * 60 * 60 * 1000 // 1 day, matches the JWT's expiresIn
};

/**
  @name registerUserController
  @description Controller function to handle user registration.
  @route POST /api/auth/register
  @access Public 
 */

async function registerUserController(req, res) {
        const {username, email, password} = req.body;
        if(!username || !email || !password){
            return res.status(400).json({message: "Please fill all the fields"});
        }

        const isUserAlreadyExists = await userModel.findOne({ $or: [{username}, {email}] });
        if(isUserAlreadyExists){
            return res.status(400).json({message: "User already exists"});
        }

        const hash= await bcrypt.hash(password, 10);
        const user = await userModel.create({
            username,
            email,
            password: hash
        })

        const token = jwt.sign({
            id: user._id,
            username: user.username,},
            process.env.JWT_SECRET,
            {expiresIn: "1d"}
        )

        res.cookie("token",token, cookieOptions)

        res.status(201).json({
            message: "User registered successfully",        
        });

    }

/**
 * @name loginUserController
 * @description Controller function to handle user login.
 * @route POST /api/auth/login
 * @access Public
 */

async function loginUserController(req, res) {
    const {email, password} = req.body;
    const user = await userModel.findOne({email});
    if(!user){
        return res.status(400).json({message: "User not found"});
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if(!isPasswordValid){
        return res.status(400).json({message: "Invalid password"});
    }

    const token = jwt.sign({
        id: user._id,
        username: user.username,},
        process.env.JWT_SECRET,
        {expiresIn: "1d"}
    )   

    res.cookie("token",token, cookieOptions)
    res.status(200).json({
        message: "User logged in successfully",
        user:{
            id: user._id,
            username: user.username,
            email: user.email
        }
    });

}

/**
 * 
 * @name logoutUserController
 * @description Controller function to handle user logout.
 * @route GET /api/auth/logout
 * @access Public 
 */

async function logoutUserController(req, res) {
    const token = req.cookies.token;
    if(token){
       await  tokenBlacklistModel.create({token});
    }

    res.clearCookie("token", {
        httpOnly: true,
        secure: isProduction,
        sameSite: isProduction ? 'none' : 'lax'
    });
    res.status(200).json({message: "User logged out successfully"});
}


/**
 * @name getMeController
 * @description Controller function to get the logged in user's information.
 * @route GET /api/auth/get-me
 * @access Private
 */

async function getMeController(req, res) {
    const user = await userModel.findById(req.user.id);
    return res.status(200).json({
        message: "User information fetched successfully",
        user:{
        id: user._id,
        username: user.username,
        email: user.email
    }
});
}


module.exports = { registerUserController, loginUserController, logoutUserController, getMeController };
