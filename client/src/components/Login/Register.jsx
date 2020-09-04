import React, {useState,useContext} from 'react'
import './login.css';
import {Link} from 'react-router-dom';
import { GlobalContext } from '../../context/GlobalState';

const Login = () => {

    const [user,setUser]=useState({
        name:"",
        email:"",
        password:"",
        confirmPassword:""
    })

    const {state,registerUser}=useContext(GlobalContext);

    return (
        <div className="Login">
            <h1 className="login-heading">
                Create An Account
            </h1>

            <span className="error">
                {
                    state.error&&
                    state.error
                }
            </span>

            <form
                onSubmit={(e)=>{
                    e.preventDefault();
                    registerUser(user);
                }}
            >
                <input type="text" placeholder="Your Name"
                    onChange={(e)=>{
                        setUser({
                            ...user,
                            name:e.target.value
                        })
                    }}
                />
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
                <input type="password" placeholder="Confirm Password"
                    onChange={(e)=>{
                        setUser({
                            ...user,
                            confirmPassword:e.target.value
                        })
                    }}
                />

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
