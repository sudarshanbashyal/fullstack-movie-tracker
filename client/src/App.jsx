import React,{useEffect,useState} from 'react'
import './App.css'

import {BrowserRouter as Router,Switch,Route} from 'react-router-dom'

import Nav from './components/Navbar/Nav'
import Home from './components/Home/Home'
import Footer from './components/Footer/Footer'
import MovieDetails from './components/MovieDetails/MovieDetails'
import Genres from './components/Genre/Genres'
import Login from './components/Login/Login'
import Register from './components/Login/Register'

import UserContext from './context/UserConext'

import { ApolloClient, InMemoryCache, ApolloProvider } from '@apollo/client';



const client=new ApolloClient({
    uri:'http://localhost:4000/graphql',
    cache: new InMemoryCache()
})


const App = () => {

    const [userData,setUserData]=useState({
        token:undefined,
        user:undefined
    })

    useEffect(()=>{

        (async function checkLoggedIn(){
            const token=localStorage.getItem('auth-token');
            const response=await fetch('http://localhost:4000/tokenIsValid',{
                method:'POST',
                headers:{
                    'Content-type':'application/json',
                    'auth-token':token
                }
            })
            const data=await response.json();
            console.log(data)

            if(data.ok){
                setUserData({
                    token:data.token,
                    user:data.user
                })
            }
        })()

    },[])

    return (
        <div className='App'>
            <ApolloProvider client={client}>

                <Router>
                    <UserContext.Provider value={{userData,setUserData}}>
                        <Nav/>
                        <Switch>
                            <Route exact path='/' component={Home} />
                            <Route exact path='/movie/:id' component={MovieDetails} />
                            <Route exact path='/genres' component={Genres} />
                            <Route exact path='/login' component={Login} />
                            <Route exact path='/register' component={Register} />
                        </Switch>
                    </UserContext.Provider>          
                </Router>

            </ApolloProvider>
        </div>
    )
}

export default App
