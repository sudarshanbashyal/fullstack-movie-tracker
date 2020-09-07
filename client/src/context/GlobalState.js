import React,{createContext, useReducer} from 'react';
import {AppReducer} from './AppReducer';

import history from '../history';

// state
const initialState={
    render:false,
    token:'',
    user:{},
    movieList:[],
    error:'',
    modal:{
        showModal:false,
        modalComponent:""
    },
    navOpen:false
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

            else dispatch({
                type:'RENDER'
            })

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
                dispatch({
                    type:'UPDATE_MODAL_COMPONENT',
                    payload:{
                        newComponent:'success'
                    }
                })
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
                    type:'UPDATE_MODAL_COMPONENT',
                    payload:{
                        newComponent:'login'
                    }
                })
            }

        }
        catch(err){
            console.log(err);
        }
    }

    function logOutUser(){
        localStorage.removeItem('auth-token');
        history.push('/');
        dispatch({
            type:'LOG_OUT'
        })
    }

    async function addMovie(userId,movieId,runtime,movieTitle,moviePoster,movieRating){
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
                    moviePoster,
                    movieRating
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

    function changeModalComponent(modalComponent){
        try{

            dispatch({
                type:'UPDATE_MODAL_COMPONENT',
                payload:{
                    newComponent:modalComponent
                }
            })

        }
        catch(err){
            console.log('err');
        }
    }

    function toggleModal(show=false,component=''){
        try{

            dispatch({
                type:'TOGGLE_MODAL',
                payload:{
                    show,
                    component
                }
            })

        }
        catch(err){
            console.log('err');
        }
    }

    function toggleNav(){
        try{
            dispatch({
                type:'TOGGLE_NAV'
            })
        }
        catch(err){
            console.log('err');
        }
    }

    function closeNav(){
        try{
            dispatch({
                type:'CLOSE_NAV'
            })
        }
        catch(err){
            console.log('err');
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
            removeMovie,
            changeModalComponent,
            toggleModal,
            toggleNav,
            closeNav
        }}>
            {children}
        </GlobalContext.Provider>
    )

}