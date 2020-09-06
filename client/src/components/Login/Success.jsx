import React,{useContext} from 'react';
import './login.css';

import {GlobalContext} from '../../context/GlobalState';


const Success = () => {

    const {toggleModal}=useContext(GlobalContext);

    return (
        <div className='Login Success'>
            
            <svg className='check' xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M20.285 2l-11.285 11.567-5.286-5.011-3.714 3.716 9 8.728 15-15.285z"/></svg>
            <h2>Successfully Logged In!</h2>

            <svg 
                onClick={()=>{toggleModal(false,'')}}
            className='close-modal' xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M24 20.188l-8.315-8.209 8.2-8.282-3.697-3.697-8.212 8.318-8.31-8.203-3.666 3.666 8.321 8.24-8.206 8.313 3.666 3.666 8.237-8.318 8.285 8.203z"/></svg>
        </div>
    )
}

export default Success
