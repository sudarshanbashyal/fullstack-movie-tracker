import React from 'react'
import './movieList.css'
import {gql,useQuery} from '@apollo/client'

import Movie from './Movie/Movie'
import LoadingAnimation from '../Loader/LoadingSpinner'

const GENRE_MOVIE_QUERY=gql`
    query GenreMovieQUery($id:Int!){
        moviesFromGenre(id:$id){
            id,
            title,
            release_date,
            poster_path
        }
    }
`

const GenreMovieList = ({name,id}) => {

    const {loading,error,data}=useQuery(GENRE_MOVIE_QUERY,{
        variables:{id}
    })

    return (
        <div className="MovieList">

            <h1 className="list-title">
                {name}
                <span className="list-line"></span>
            </h1>

            <div className="movie-scroll">
                {
                    data?data.moviesFromGenre.map(movie=>(
                        <Movie key={movie.id} id={movie.id} title={movie.title} release_date={movie.release_date} poster_path={movie.poster_path} />
                    )):<LoadingAnimation />
                }
            </div>
            
        </div>
    )
}

export default GenreMovieList
