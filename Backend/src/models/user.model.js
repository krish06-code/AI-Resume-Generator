const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        unique: [true, "username already exists"],
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: [true, "email already exists"],
    },
    password: {
        type: String,
        required: true
    }
});

const UserModel = mongoose.model('Users', userSchema);
module.exports = UserModel;