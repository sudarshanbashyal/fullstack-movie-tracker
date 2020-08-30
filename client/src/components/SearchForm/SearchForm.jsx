import React,{useState} from 'react'
import Autosuggest from 'react-autosuggest'
import {useHistory} from 'react-router-dom'

const SearchForm = () => {

    const history=useHistory()

    const [movie,setMovie]=useState('')
    const [suggestions,setSuggestions]=useState([])

    return (
        <Autosuggest className='movie-input' inputProps={{
                placeholder:"Search for a Movie...",
                autoComplete:"abcd",
                name:"movie",
                value:movie,
                onChange:(e,{newValue})=>{
                    setMovie(newValue)
                }
            }} 
            suggestions={suggestions}
            onSuggestionsFetchRequested={async({value})=>{
                if(!value) {
                    setSuggestions([]) 
                    return
                }
                try{
                    const response=await fetch(`https://api.themoviedb.org/3/search/movie?api_key=${process.env.REACT_APP_TMDB_KEY}&language=en-US&query=${value}&page=1&include_adult=true`)
                    const data=await response.json()
                    const movieList=data.results
                    const shortList=movieList.slice(0,5)
                    
                    setSuggestions(shortList.map(movie=>({
                        id:movie.id,
                        title:movie.title
                    })))

                }
                catch(e){

                }
            }}
            onSuggestionsClearRequested={()=>{
                setSuggestions([])
            }}
            getSuggestionValue={(suggestion)=>suggestion.title}
            renderSuggestion={(suggestion)=><div className='suggestion'>{suggestion.title}</div>}
            onSuggestionSelected={(event,{suggestion,method})=>{
                if(method==='enter'){
                    event.preventDefault()
                }
                history.push(`/movie/${suggestion.id}`)
                setMovie(suggestion.title)
            }}
        />
    )
}

export default SearchForm
