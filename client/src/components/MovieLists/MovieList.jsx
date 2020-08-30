import React from 'react'
import './movieList.css'
import {gql,useQuery} from '@apollo/client'

import Movie from './Movie/Movie'

const MOVIE_LIST_QUERY=gql`
    query MovieListQuery($listName:String!){
        movies(listName:$listName){
            id,
            title,
            release_date,
            poster_path
        }
    }
`

const MovieList = ({listName,title}) => {
    

    const {loading,error,data}=useQuery(MOVIE_LIST_QUERY,{
        variables:{listName}
    })

    return (
        <div className='MovieList'>

            <h1 className='list-title'>
                {title}
                <span className='list-line'></span>
            </h1>

            <div className="movie-scroll">
                {
                    data&&data.movies.map(movie=>(
                        <Movie key={movie.id} id={movie.id} title={movie.title} release_date={movie.release_date} poster_path={movie.poster_path} />
                    ))
                    
            }
            </div>
            
        </div>
    )
}

export default MovieList
