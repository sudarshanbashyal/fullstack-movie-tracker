import React from 'react'
import './movieList.css'
import {gql,useQuery} from '@apollo/client'

import Movie from './Movie/Movie'

const SIMILAR_LIST_QUERY=gql`
    query SimilarListQuery($id:Int!){
        similarMovies(id:$id){
            id,
            title,
            release_date,
            poster_path
        }
    }
`

const SimilarList = ({id}) => {

    const {loading,error,data}=useQuery(SIMILAR_LIST_QUERY,{
        variables:{id}
    })

    return (
        <div className="MovieList">

            <h1 className="list-title">
                More Like This
                <span className="list-line"></span>
            </h1>

            <div className="movie-scroll">
                {
                    data&&
                    data.similarMovies.length>0?data.similarMovies.map(movie=>(
                        <Movie key={movie.id} id={movie.id} title={movie.title} release_date={movie.release_date} poster_path={movie.poster_path} />
                    )):
                    <div className="empty">
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M12 2c5.514 0 10 4.486 10 10s-4.486 10-10 10-10-4.486-10-10 4.486-10 10-10zm0-2c-6.627 0-12 5.373-12 12s5.373 12 12 12 12-5.373 12-12-5.373-12-12-12zm4 17h-8v-2h8v2zm-7.5-9c-.828 0-1.5.671-1.5 1.5s.672 1.5 1.5 1.5 1.5-.671 1.5-1.5-.672-1.5-1.5-1.5zm7 0c-.828 0-1.5.671-1.5 1.5s.672 1.5 1.5 1.5 1.5-.671 1.5-1.5-.672-1.5-1.5-1.5z"/></svg>
                        No Similar Movies Here.
                    </div>
                }
            </div>
            
        </div>
    )
}

export default SimilarList
