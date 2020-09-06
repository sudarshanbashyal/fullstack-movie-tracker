import React,{useContext} from 'react';
import './login.css';
import {GlobalContext} from '../../context/GlobalState';


const LogOut = () => {

    const {logOutUser,toggleModal}=useContext(GlobalContext);

    return (
        <div className="Login Logout">

            <div className="icon">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M8 9v-4l8 7-8 7v-4h-8v-6h8zm2-7v2h12v16h-12v2h14v-20h-14z"/></svg>
            </div>

            <div className="message">
                <p>Are you sure you want to log out?</p>
                <div className="buttons">
                    <button className='log-btn'
                        onClick={logOutUser}
                    >Log Out</button>

                    <button className='cancel-btn'
                        onClick={()=>{toggleModal(false,'')}}
                    >Cancel</button>
                </div>
            </div>
        
        </div>
    )
}

export default LogOut
