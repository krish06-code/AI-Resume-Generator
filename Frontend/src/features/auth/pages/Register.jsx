import React,{useState} from 'react'
import '../auth.style.scss'
import {useNavigate,Link} from "react-router";
import {useAuth} from "../hooks/useAuth.js";
import Loader from "../../../components/Loader.jsx";


const Register = () => {

    const navigate = useNavigate();
    const {loading, handleRegister} = useAuth();
    
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

      const handleSubmit = async (e) => {
        e.preventDefault();
        await handleRegister(username, email, password);
        navigate("/dashboard");
      }

      if(loading) {
        return <Loader label="Setting up your account..." />
      }
      
  return (
    <main>
        <div className="form-container">
            <Link to="/" className="back-home-link">&larr; Back to home</Link>
            <h1>Register</h1>
            <form onSubmit={handleSubmit}>

            <div className="input-group">
                <label htmlFor="username">Username</label>
                <input
                    onChange={(e) => setUsername(e.target.value)}
                    type="text" id="username" name="username" placeholder='Enter your username' />
            </div>

            <div className="input-group">
                <label htmlFor="email">Email</label>
                <input
                    onChange={(e) => setEmail(e.target.value)}
                    type="email" id="email" name="email" placeholder='Enter your email address' />
            </div>

            <div className="input-group">
                <label htmlFor="password">Password</label>
                <input
                    onChange={(e) => setPassword(e.target.value)}
                    type="password" id="password" name="password" placeholder='Enter your password' />
            </div>

            <button type="submit" className="button primary-button">Register</button>

             </form>

             <p>Already have an account? <Link to="/login">Login</Link> </p>
        </div>
    </main>
  )
}

export default Register