import React from 'react'
import {gql,useQuery} from '@apollo/client'
import './movieDetails.css'
import VideoPlayer from './VideoPlayer'
import SimilarList from '../MovieLists/SimilarList'

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
                                <span>
                                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M12 5.173l2.335 4.817 5.305.732-3.861 3.71.942 5.27-4.721-2.524-4.721 2.525.942-5.27-3.861-3.71 5.305-.733 2.335-4.817zm0-4.586l-3.668 7.568-8.332 1.151 6.064 5.828-1.48 8.279 7.416-3.967 7.416 3.966-1.48-8.279 6.064-5.827-8.332-1.15-3.668-7.569z"/></svg>
                                    {data.movie.vote_average}
                                </span>

                                <span>
                                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M12 2c5.514 0 10 4.486 10 10s-4.486 10-10 10-10-4.486-10-10 4.486-10 10-10zm0-2c-6.627 0-12 5.373-12 12s5.373 12 12 12 12-5.373 12-12-5.373-12-12-12zm1 12v-6h-2v8h7v-2h-5z"/></svg>
                                    {data.movie.runtime} min
                                </span>

                                <span>
                                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M24 2v22h-24v-22h3v1c0 1.103.897 2 2 2s2-.897 2-2v-1h10v1c0 1.103.897 2 2 2s2-.897 2-2v-1h3zm-2 6h-20v14h20v-14zm-2-7c0-.552-.447-1-1-1s-1 .448-1 1v2c0 .552.447 1 1 1s1-.448 1-1v-2zm-14 2c0 .552-.447 1-1 1s-1-.448-1-1v-2c0-.552.447-1 1-1s1 .448 1 1v2zm6.687 13.482c0-.802-.418-1.429-1.109-1.695.528-.264.836-.807.836-1.503 0-1.346-1.312-2.149-2.581-2.149-1.477 0-2.591.925-2.659 2.763h1.645c-.014-.761.271-1.315 1.025-1.315.449 0 .933.272.933.869 0 .754-.816.862-1.567.797v1.28c1.067 0 1.704.067 1.704.985 0 .724-.548 1.048-1.091 1.048-.822 0-1.159-.614-1.188-1.452h-1.634c-.032 1.892 1.114 2.89 2.842 2.89 1.543 0 2.844-.943 2.844-2.518zm4.313 2.518v-7.718h-1.392c-.173 1.154-.995 1.491-2.171 1.459v1.346h1.852v4.913h1.711z"/></svg>
                                    {data.movie.release_date}
                                </span>

                                <span>
                                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M12 2c5.514 0 10 4.486 10 10s-4.486 10-10 10-10-4.486-10-10 4.486-10 10-10zm0-2c-6.627 0-12 5.373-12 12s5.373 12 12 12 12-5.373 12-12-5.373-12-12-12zm4 14.083c0-2.145-2.232-2.742-3.943-3.546-1.039-.54-.908-1.829.581-1.916.826-.05 1.675.195 2.443.465l.362-1.647c-.907-.276-1.719-.402-2.443-.421v-1.018h-1v1.067c-1.945.267-2.984 1.487-2.984 2.85 0 2.438 2.847 2.81 3.778 3.243 1.27.568 1.035 1.75-.114 2.011-.997.226-2.269-.168-3.225-.54l-.455 1.644c.894.462 1.965.708 3 .727v.998h1v-1.053c1.657-.232 3.002-1.146 3-2.864z"/></svg>
                                    {data.movie.revenue.toLocaleString()}
                                </span>
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
