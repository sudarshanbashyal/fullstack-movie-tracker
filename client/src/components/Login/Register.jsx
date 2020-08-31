import React from 'react'
import './login.css'
import {Link} from 'react-router-dom'

const Login = () => {
    return (
        <div className="Login">
            <h1 className="login-heading">
                Create An Account
            </h1>

            <form>
                <input type="text" placeholder="Your Name"/>
                <input type="email" placeholder="Email Address"/>
                <input type="password" placeholder="Password"/>
                <input type="password" placeholder="Confirm Password"/>

                <button className="register-btn">
                    Register
                </button>
            </form>

            <p className="form-message">
                Already have an account? 
                <Link className="links" to="/login">
                    Log In
                </Link>
            </p>
        </div>
    )
}

export default Login
