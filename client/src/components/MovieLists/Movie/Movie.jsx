import React from 'react'
import {Link} from 'react-router-dom'

const Movie = ({id,title,release_date,poster_path}) => {
    return (
        <div className='Movie'>
            <div className="movie-card">

                <div className="movie-poster">
                    <Link to={`/movie/${id}`}>
                        <img src={`https://image.tmdb.org/t/p/w500/${poster_path}`} alt=""/>
                    </Link>
                </div>

                <h3 className="movie-title">{title}</h3>

                <p className="movie-release-date">
                    {release_date.substring(0,4)}
                </p>

            </div>

        </div>
    )
}

export default Movie
