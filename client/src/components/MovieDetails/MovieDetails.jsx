import React, {useContext} from 'react';
import {gql,useQuery} from '@apollo/client';
import './movieDetails.css';
import VideoPlayer from './VideoPlayer';
import SimilarList from '../MovieLists/SimilarList';
import { GlobalContext } from '../../context/GlobalState';

import {starSvg, clockSvg, dateSvg, dollarSvg} from './Svg.js';

const MOVIE_QUERY=gql`
    query MovieQuery($id:Int!){
        movie(id:$id){
            id,
            title,
            genres{
                id,
                name
            },
            overview,
            poster_path,
            backdrop_path,
            release_date,
            revenue,
            runtime,
            vote_average
        }
    }
`

const MovieDetails = ({match}) => {

    let id=match.params.id
    id=parseInt(id)

    const {loading,error,data}=useQuery(MOVIE_QUERY,{
        variables:{id}
    })

    const {state,addMovie,movielist}=useContext(GlobalContext); 

    return (
        
        <div className='MovieDetails'>
            {
                data&&
                <div>
                    <div className="movie-details">
                        <div className="movie-details-poster">
                            <img src={`https://image.tmdb.org/t/p/w500/${data.movie.poster_path}`} alt=""/>
                        </div>

                        <div className="movie-info">
                            <div>
                                <h1 className="movie-title">
                                    {data.movie.title}
                                </h1>

                                <div className="genre">
                                    {data.movie.genres.map(genre=>(
                                        <span key={genre.id}>{genre.name}</span>
                                    ))}
                                </div>

                            </div>

                            <p className="overview">
                                {data.movie.overview}
                            </p>

                            <div className="sign-info">
                                <span> {starSvg}{data.movie.vote_average} </span>
                                <span> {clockSvg}{data.movie.runtime} min </span>
                                <span> {dateSvg}{data.movie.release_date} </span>
                                <span> {dollarSvg}{data.movie.revenue.toLocaleString()} </span>
                            </div>

                            <div className="buttons">
                                <button className="watchlist-btn">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M16 2v17.582l-4-3.512-4 3.512v-17.582h8zm2-2h-12v24l6-5.269 6 5.269v-24z"/></svg>
                                    Add to WatchList
                                </button>

                                <button className="favourite-btn">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M6.28 3c3.236.001 4.973 3.491 5.72 5.031.75-1.547 2.469-5.021 5.726-5.021 2.058 0 4.274 1.309 4.274 4.182 0 3.442-4.744 7.851-10 13-5.258-5.151-10-9.559-10-13 0-2.676 1.965-4.193 4.28-4.192zm.001-2c-3.183 0-6.281 2.187-6.281 6.192 0 4.661 5.57 9.427 12 15.808 6.43-6.381 12-11.147 12-15.808 0-4.011-3.097-6.182-6.274-6.182-2.204 0-4.446 1.042-5.726 3.238-1.285-2.206-3.522-3.248-5.719-3.248z"/></svg>
                                </button>
                            </div>
                            
                        </div>                        

                    </div>
                    
                    <div className="video-player">
                        <VideoPlayer id={id} />
                    </div>

                    <SimilarList id={id} />

                </div>
                
            }
        </div>
    )
}

export default MovieDetails
