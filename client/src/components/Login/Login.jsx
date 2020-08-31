import React from 'react'
import './login.css'
import {Link} from 'react-router-dom'

const Login = () => {
    return (
        <div className="Login">
            <h1 className="login-heading">
                Welcome, Sign in Here.
            </h1>

            <form>
                <input type="email" placeholder="Email Address"/>
                <input type="password" placeholder="Password"/>

                <button className="register-btn">
                    Log In
                </button>
            </form>

            <p className="form-message">
                Do not have an account? 
                <Link className="links" to='register'>
                    Register
                </Link>
            </p>
        </div>
    )
}

export default Login
