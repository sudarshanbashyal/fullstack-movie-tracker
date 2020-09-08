import React,{useEffect,useState} from 'react';

const VideoPlayer = ({id}) => {

    const [videoKey,setVideoKey]=useState('');
    
    useEffect(()=>{
        (async function getVideo(){
            const response=await fetch(`http://api.themoviedb.org/3/movie/${id}/videos?api_key=ed8491f2986b2b920e8351ab4134188f`);
            const data=await response.json();
            if(data.results[0]){
                setVideoKey(data.results[0].key);
            }

        })()
    },[videoKey])

    const video=<iframe className='video' src={`https://www.youtube-nocookie.com/embed/${videoKey}?autoplay=0&modestbranding=1&showinfo=0&rel=0&iv_load_policy=3&fs=0&color=white&controls=0`} frameBorder="0"></iframe>

    return (
        <div className='VideoPlayer'>
            {
                videoKey&&
                <div className="player">
            
                    {video}

                </div> 
            }      

        </div>
    )
}

export default VideoPlayer
