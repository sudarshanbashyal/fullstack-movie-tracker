import React,{useState} from 'react'
import './nav.css'
import logo from '../../assets/logo.png'
import SearchForm from '../SearchForm/SearchForm'
import {useHistory,Link} from 'react-router-dom'

const Nav = () => {
    const history=useHistory()
    const [showSearch,setShowSearch]=useState(false)

    return (
        <div className='Navbar'>
            <div className="navmenu">
                <Link to='/'>
                    <img src={logo} className='logo' alt=""/>
                </Link>
                <div className="nav-items">
                    <ul>
                        <li>
                            <Link className='links' to='/'>
                                Home
                            </Link>
                        </li>
                        <li>
                            <Link className='links' to='genres'>
                                Genre
                            </Link>
                        </li>
                        <li>Login</li>
                        <li>Register</li>
                    </ul>
                </div>
                <svg 
                    onClick={()=>{setShowSearch(!showSearch)}}
                    className='search-icon' xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M23.809 21.646l-6.205-6.205c1.167-1.605 1.857-3.579 1.857-5.711 0-5.365-4.365-9.73-9.731-9.73-5.365 0-9.73 4.365-9.73 9.73 0 5.366 4.365 9.73 9.73 9.73 2.034 0 3.923-.627 5.487-1.698l6.238 6.238 2.354-2.354zm-20.955-11.916c0-3.792 3.085-6.877 6.877-6.877s6.877 3.085 6.877 6.877-3.085 6.877-6.877 6.877c-3.793 0-6.877-3.085-6.877-6.877z"/>
                </svg>
            </div>

            <div className="search-form" style={{display:showSearch?'block':'none'}}>
                <SearchForm />
            </div>
        </div>
    )
}

export default Nav
