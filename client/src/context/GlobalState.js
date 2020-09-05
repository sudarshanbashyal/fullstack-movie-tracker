import React,{createContext,useConext, useReducer} from 'react';
import {AppReducer} from './AppReducer';

import history from '../history';
import fetch from 'node-fetch';

// state
const initialState={
    token:'',
    user:{},
    movieList:[],
    error:''
}

// context
export const GlobalContext=createContext(initialState);

// provider
export const GlobalProvider=({children})=>{

    const [state,dispatch]=useReducer(AppReducer,initialState);

    async function checkToken(){
        try{

            const token=localStorage.getItem('auth-token');
            const response=await fetch('http://localhost:4000/tokenIsValid',{
                method:'POST',
                headers:{
                    'Content-type':'application/json',
                    'auth-token':token
                }
            })
            const data=await response.json();
            if(data.ok){
                dispatch({
                    type:'SET_USER',
                    payload:{
                        user:data.user,
                        token:data.token,
                        movieList:data.list
                    }
                })
            }

        }
        catch(err){
            console.log(err);
        }
    }

    async function logInUser(user){
        try{

            const response=await fetch('http://localhost:4000/login',{
                method:'POST',
                headers:{
                    'Content-type':'application/json'
                },
                body:JSON.stringify(user)
            })
            const data=await response.json();

            if(!data.ok){
                dispatch({
                    type:'DISPLAY_ERROR',
                    payload:{
                        error:data.error
                    }
                })
            }
            else{
                localStorage.setItem('auth-token',data.token);
                checkToken();
                history.push('/');
            }

        }   
        catch(err){
            console.log(err);
        }
    }

    async function registerUser(user){

        try{
            const response=await fetch('http://localhost:4000/register',{
                method:'POST',
                headers:{
                    'Content-type':'application/json'
                },
                body:JSON.stringify(user)
            })

            const data=await response.json();

            if(!data.ok){
                dispatch({
                    type:'DISPLAY_ERROR',
                    payload:{
                        error:data.error
                    }
                })
            }
            else{
                dispatch({
                    type:'CLEAR_ERROR'
                })
                history.push('/login');
            }

        }
        catch(err){
            console.log(err);
        }
    }

    function logOutUser(){
        localStorage.removeItem('auth-token');
        dispatch({
            type:'LOG_OUT'
        })
    }

    async function addMovie(userId,movieId,runtime,movieTitle,moviePoster){
        try{

            const response=await fetch('http://localhost:4000/addMovie',{
                method:'POST',
                headers:{
                    'Content-type':'application/json'
                },
                body:JSON.stringify({
                    userId,
                    movieId,
                    runtime,
                    movieTitle,
                    moviePoster
                })
            })

            const data=await response.json();
            if(data.ok){
                dispatch({
                    type:'UPDATE_MOVIE_LIST',
                    payload:{
                        updatedList:data.updatedList
                    }
                })
            }
        }
        catch(err){
            console.log(err);
        }
    }

    async function removeMovie(userId,movieId){
        try{
            const response=await fetch('http://localhost:4000/removeMovie',{
                method:'POST',
                headers:{
                    'Content-type':'application/json'
                },
                body:JSON.stringify({
                    userId,
                    movieId
                })
            })

            const data=await response.json();

            if(data.ok){
                dispatch({
                    type:'UPDATE_MOVIE_LIST',
                    payload:{
                        updatedList:data.updatedList
                    }
                })
            }
        }
        catch(err){
            console.log(err);
        }
    }

    return(
        <GlobalContext.Provider value={{
            state,
            checkToken,
            logInUser,
            logOutUser,
            registerUser,
            addMovie,
            removeMovie
        }}>
            {children}
        </GlobalContext.Provider>
    )

}