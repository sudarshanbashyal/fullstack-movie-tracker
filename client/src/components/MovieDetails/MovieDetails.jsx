import React, {useContext} from 'react';
import {useHistory} from 'react-router-dom';
import {gql,useQuery} from '@apollo/client';
import './movieDetails.css';
import VideoPlayer from './VideoPlayer';
import SimilarList from '../MovieLists/SimilarList';
import { GlobalContext } from '../../context/GlobalState';

import NotFound from '../404/404';

import {starSvg, clockSvg, dateSvg, dollarSvg, bookmarkStroke} from './Svg.js';

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

    const history=useHistory();

    let id=match.params.id
    id=parseInt(id)

    const {data, loading, error}=useQuery(MOVIE_QUERY,{
        variables:{id}
    })

    const {state,addMovie,removeMovie,toggleModal}=useContext(GlobalContext); 

    // add and remove list buttons 
    const addListBtn=<button className="watchlist-btn" onClick={()=>{

        if(state.token!=='') addMovie(state.user.id,data.movie.id,data.movie.runtime,data.movie.title,data.movie.poster_path,data.movie.vote_average)
        else toggleModal(true,'login');

    }}>{bookmarkStroke} Add To Watchlist</button>

    const removeListBtn=<button className="watchlist-btn" onClick={()=>{removeMovie(state.user.id,data.movie.id)}} >{bookmarkStroke} On Your Watchlist</button> 

    // check if current movie is in the user's movieList
    let watchListBtn;

    if(data&&state){
        const onList=state.movieList.filter(movieInList=>movieInList.id===data.movie.id);

        if(onList[0]) watchListBtn=removeListBtn;
        else watchListBtn=addListBtn;
    }

    return (
        
        <div className='MovieDetails full-container'>
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
                                {watchListBtn}
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
