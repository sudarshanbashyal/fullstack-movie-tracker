import React, {useContext} from 'react';
import {Link} from 'react-router-dom';

import { GlobalContext } from '../../context/GlobalState';

const WatchSingle = ({id,title,runtime,date,poster,rating}) => {

    const displayDate=new Date(date);

    const {state,removeMovie}=useContext(GlobalContext);

    return (
        
        <div className='WatchSingle'>
            <img src={`https://image.tmdb.org/t/p/w500/${poster}`} alt=""/>

            <div className="info">
                <h2>
                    <Link className='links' to={`movie/${id}`}>
                        {title}
                    </Link>
                </h2>

                <span className='date'>
                    <span>Added on:</span> 
                    <span className='displayDate'>{displayDate.getUTCDate()}-{displayDate.getMonth()}-{displayDate.getFullYear()}</span>
                </span>

                <hr/>

                <div>
                    <span>
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M12 2c5.514 0 10 4.486 10 10s-4.486 10-10 10-10-4.486-10-10 4.486-10 10-10zm0-2c-6.627 0-12 5.373-12 12s5.373 12 12 12 12-5.373 12-12-5.373-12-12-12zm1 12v-6h-2v8h7v-2h-5z"/></svg>
                        {runtime} min
                    </span>

                    <span>
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M12 5.173l2.335 4.817 5.305.732-3.861 3.71.942 5.27-4.721-2.524-4.721 2.525.942-5.27-3.861-3.71 5.305-.733 2.335-4.817zm0-4.586l-3.668 7.568-8.332 1.151 6.064 5.828-1.48 8.279 7.416-3.967 7.416 3.966-1.48-8.279 6.064-5.827-8.332-1.15-3.668-7.569z"/></svg>
                        {rating}
                    </span>
                </div>

            </div>

            <svg 
                onClick={()=>{
                    removeMovie(state.user.id,id);
                }}
            className='trash' xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M21 6l-3 18h-12l-3-18h2.028l2.666 16h8.611l2.666-16h2.029zm-4.711-4c-.9 0-1.631-1.099-1.631-2h-5.316c0 .901-.73 2-1.631 2h-5.711v2h20v-2h-5.711z"/></svg>

        </div>
    )

}

export default WatchSingle
