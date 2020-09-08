import React,{useEffect,useState} from 'react';
import {gql,useQuery} from '@apollo/client';

const VIDEO_QUERY=gql`
    query VideoQuery($id:Int!){
        video(id:$id){
            results{
                key
            }
        }
    }
`

const VideoPlayer = ({id}) => {

    const {data,loading,error}=useQuery(VIDEO_QUERY,{
        variables:{id}
    })

    let video;
    if(data){
        video=<iframe className='video' src={`https://www.youtube-nocookie.com/embed/${data.video.results[0].key}?autoplay=0&modestbranding=1&showinfo=0&rel=0&iv_load_policy=3&fs=0&color=white&controls=0`} frameBorder="0"></iframe>
    }

    return (
        <div className='VideoPlayer'>
            {
                data&&
                <div className="player">
            
                    {video}

                </div> 
            }      

        </div>
    )
}

export default VideoPlayer
