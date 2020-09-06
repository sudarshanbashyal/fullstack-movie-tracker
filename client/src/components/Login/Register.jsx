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

    const {state,registerUser,changeModalComponent,toggleModal}=useContext(GlobalContext);

    return (
        <div className="Register Login">
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
                <span className="links" onClick={()=>{changeModalComponent('login')}}>
                    Log In
                </span>
            </p>

            <svg 
                onClick={()=>{toggleModal(false,'')}}
            className='close-modal' xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M24 20.188l-8.315-8.209 8.2-8.282-3.697-3.697-8.212 8.318-8.31-8.203-3.666 3.666 8.321 8.24-8.206 8.313 3.666 3.666 8.237-8.318 8.285 8.203z"/></svg>

        </div>
    )
}

export default Login
