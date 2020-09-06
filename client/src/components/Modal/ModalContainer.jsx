import React, {useContext} from 'react';

import './modalContainer.css';
import Login from '../Login/Login';
import Register from '../Login/Register';
import Success from '../Login/Success';

import { GlobalContext } from '../../context/GlobalState';

const ModalContainer = () => {

    const {state,state:{modal}}=useContext(GlobalContext);

    return (
        <div className='ModalContainer' style={{display:modal&&modal.showModal?'flex':'none'}}>

            {
                modal&&
                modal.modalComponent==='success'?<Success />:
                modal.modalComponent==='login'?<Login />:<Register />
            }
        
        </div>
    )
}

export default ModalContainer
