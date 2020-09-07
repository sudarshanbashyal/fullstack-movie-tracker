import React, {useState, useContext} from 'react';
import './nav.css';
import logo from '../../assets/logo.png';
import SearchForm from '../SearchForm/SearchForm';
import {useHistory} from 'react-router-dom';

import {GlobalContext} from '../../context/GlobalState';

const Nav = () => {

    const history=useHistory();

    const {state,state:{navOpen},toggleModal,toggleNav,closeNav}=useContext(GlobalContext);
    const [showSearch,setShowSearch]=useState(false);
    
    return (
        <div className='Navbar full-container'>
            <div className="navmenu">
                <img onClick={()=>{history.push('/'); closeNav()}} src={logo} className='logo' alt=""/>

                <div className={navOpen?'expand nav-items':'nav-items'}>
                    <ul>
                        <li className='links' onClick={()=>{history.push('/'); closeNav()}}> 
                            Home
                        </li>
                        <li className='links' onClick={()=>{history.push('/genres'); closeNav()}}>
                            Genre
                        </li>
                        {
                            state.token===''?
                            <li>
                                <span className='links' onClick={()=>{toggleModal(true,'login')}}>
                                    Login
                                </span>
                            </li>:
                            <li className='links' onClick={()=>{history.push('/mylist'); closeNav()}}>
                                My List
                            </li>
                        }
                        {
                            state.token===''?
                            <li>
                                <span className='links' onClick={()=>{toggleModal(true,'register')}}>
                                    Register
                                </span>
                            </li>:

                            <li onClick={()=>{
                                toggleModal(true,'logout');
                            }}>
                                Log Out
                            </li>
                        }
                    </ul>
                </div>

                <svg 
                    onClick={()=>{
                        setShowSearch(!showSearch);
                        closeNav();
                    }}
                    className='search-icon' xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M23.809 21.646l-6.205-6.205c1.167-1.605 1.857-3.579 1.857-5.711 0-5.365-4.365-9.73-9.731-9.73-5.365 0-9.73 4.365-9.73 9.73 0 5.366 4.365 9.73 9.73 9.73 2.034 0 3.923-.627 5.487-1.698l6.238 6.238 2.354-2.354zm-20.955-11.916c0-3.792 3.085-6.877 6.877-6.877s6.877 3.085 6.877 6.877-3.085 6.877-6.877 6.877c-3.793 0-6.877-3.085-6.877-6.877z"/>
                </svg>

                <svg 
                    onClick={toggleNav}
                    className='hamburger-icon' xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M24 6h-24v-4h24v4zm0 4h-24v4h24v-4zm0 8h-24v4h24v-4z"/>
                </svg>

            </div>

            <div className="search-form" style={{display:showSearch?'block':'none'}}>
                <SearchForm />
            </div>
        </div>
    )
}

export default Nav
