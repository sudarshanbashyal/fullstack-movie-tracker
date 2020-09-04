import React, {useState, useContext} from 'react';
import './login.css';
import {Link} from 'react-router-dom';
import {GlobalContext} from '../../context/GlobalState';

const Login = () => {

    const {logInUser,state}=useContext(GlobalContext);
    const [user,setUser]=useState({
        email:'',
        password:''
    })
    
    return (
        <div className="Login">
            <h1 className="login-heading">
                Welcome, Sign in Here.
            </h1>

            <span className="error">
                {
                    state.error&&
                    state.error
                }
            </span>

            <form onSubmit={(e)=>{
                e.preventDefault();
                logInUser(user);
            }}>

                <input type="email" placeholder="Email Address"
                    onChange={(e)=>{
                        setUser({
                            ...user,
                            email:e.target.value
                        })
                    }}
                />
                <input type="password" placeholder="Password"
                    onChange={(e)=>{
                        setUser({
                            ...user,
                            password:e.target.value
                        })
                    }}
                />

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
