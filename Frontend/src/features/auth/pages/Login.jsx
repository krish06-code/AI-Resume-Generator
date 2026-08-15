import React,{useState} from 'react'
import '../auth.style.scss'
import {useNavigate,Link} from "react-router";
import {useAuth} from "../hooks/useAuth.js";
import Loader from "../../../components/Loader.jsx";

const Login = () => {
    const navigate = useNavigate();
    const {loading, handleLogin} = useAuth();
    const [password, setpassword] = useState("");
    const [email, setemail] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();
        await handleLogin(email, password);
        // Handle login logic here
        navigate("/dashboard");
    }

    if(loading) {
        return <Loader label="Logging you in..." />
    }


  return (

     <main>
        <div className="form-container">
            <Link to="/" className="back-home-link">&larr; Back to home</Link>
            <h1>Login</h1>
            <form onSubmit={handleSubmit}>

            <div className="input-group">
                <label htmlFor="email">Email</label>
                <input
                onChange={(e)=>{setemail(e.target.value)}} type="email" id="email" name="email" placeholder='Enter your email address' />
            </div>

            <div className="input-group">
                <label htmlFor="password">Password</label>
                <input 
                onChange={(e)=>{setpassword(e.target.value)}} 
                type="password" id="password" name="password" placeholder='Enter your password' />
            </div>

            <button type="submit" className="button primary-button">Login</button>

             </form>

             <p>Don't have an account? <Link to="/register">Register</Link> </p>
        </div>
    </main>
  )
}

export default Login