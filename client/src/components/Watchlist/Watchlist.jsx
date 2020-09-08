import React, {useContext, useEffect} from 'react';
import {useHistory} from 'react-router-dom';
import './watchlist.css';
import { GlobalContext } from '../../context/GlobalState';

import WatchSingle from './WatchSingle';

const Watchlist = () => {

    const history=useHistory();
    const {state}=useContext(GlobalContext);

    useEffect(()=>{
        if(state.render){
            if(state.token===''){
                history.push('/');
            }
        }
    },[state.user])

    if(state.movieList[0])return (
        <div className='Watchlist full-container'>
            <h1 className="title">
                My List
            </h1>
            
            <div className="list-container">
                {
                    state.movieList.map(movie=>(
                        <WatchSingle 
                            key={movie.id} 
                            id={movie.id}
                            title={movie.title} 
                            runtime={movie.runtime} 
                            date={movie.dateAdded} 
                            poster={movie.moviePoster} 
                            rating={movie.movieRating}
                        />
                    ))
                }
            </div>

        </div>
    )
    else return(
        <div className='Watchlist full-container'>
            <h1 className="title">
                Empty! Add some movies to your Watchlist.
            </h1>
        </div>
    )
}

export default Watchlist
