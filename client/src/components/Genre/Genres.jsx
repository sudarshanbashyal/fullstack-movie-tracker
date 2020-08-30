import React,{useState} from 'react'
import './genre.css'

import {gql,useQuery} from '@apollo/client'
import GenreMovieList from '../MovieLists/GenreMovieList'

const GENRE_QUERY=gql`
    query GenreQuery{
        genres{
            id,
            name
        }
    }
`

const Genres = () => {

    const {loading,error,data}=useQuery(GENRE_QUERY)
    const [currentGenre,setCurrentGenre]=useState({
        id:28,
        name:"Action"
    })

    return (
        <div className='Genres'>
            <div className="genre-header">
                <div className="genre-text">
                    <h1>Filter Movies By Your Favourite Genre.</h1>
                </div>
            </div>

            <div className="genre-list">
                {
                    data&&data.genres.map(genre=>(
                        <span key={genre.id}
                            onClick={()=>{
                                setCurrentGenre({
                                    id:genre.id,
                                    name:genre.name
                                })
                            }}
                        >
                            {genre.name}
                        </span>
                    ))
                }
            </div>

            <GenreMovieList id={currentGenre.id} name={currentGenre.name} />

        </div>
    )
}

export default Genres
