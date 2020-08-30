import React,{useState} from 'react'
import SearchForm from '../../SearchForm/SearchForm'

const Header = () => {

    return (
        <div className="Header">
            <div className="header-image">
                <div className="header-container">

                    <h1 className="header-text">
                        Keep Track of What You Watch.
                    </h1>

                    <div className="auto-suggest">
                        <SearchForm />
                    </div>

                </div>
            </div>
        </div>
    )
}

export default Header
