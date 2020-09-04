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
                        token:data.token
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

        }
    }

    function logOutUser(){
        localStorage.removeItem('auth-token');
        dispatch({
            type:'LOG_OUT'
        })
    }

    return(
        <GlobalContext.Provider value={{
            state,
            checkToken,
            logInUser,
            logOutUser,
            registerUser
        }}>
            {children}
        </GlobalContext.Provider>
    )

}