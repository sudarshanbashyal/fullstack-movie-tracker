import React, {useContext, useEffect} from 'react'
import './home.css'
import Header from './Header/Header'
import MovieList from '../MovieLists/MovieList'

import { GlobalContext } from '../../context/GlobalState'

const Home = () => {

    const {state:{closeNav}}=useContext(GlobalContext);

    return (
        <div className='Home'>
            <Header/>

            {/* popular */}
            <div className="landing-lists">
                <MovieList listName='popular' title='Popular Now' />
                <MovieList listName='upcoming' title='Upcoming' />
                <MovieList listName='top_rated' title='Top Rated' />
            </div>

        </div>
    )
}

export default Home
