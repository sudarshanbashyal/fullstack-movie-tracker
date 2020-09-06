import React,{useEffect, useContext, useState} from 'react';
import './App.css'

import {Router,Switch,Route} from 'react-router-dom';

import Nav from './components/Navbar/Nav';
import Home from './components/Home/Home';
import Footer from './components/Footer/Footer';
import MovieDetails from './components/MovieDetails/MovieDetails';
import Genres from './components/Genre/Genres';

import Watchlist from './components/Watchlist/Watchlist';

import {GlobalContext} from './context/GlobalState';
import { ApolloClient, InMemoryCache, ApolloProvider } from '@apollo/client';

import history from './history';
import ModalContainer from './components/Modal/ModalContainer';

const client=new ApolloClient({
    uri:'http://localhost:4000/graphql',
    cache: new InMemoryCache()
})


const App = () => {

    // authenticate the token on app startup and store the user
    const {state:{render},checkToken}=useContext(GlobalContext);

    useEffect(()=>{

        checkToken();

    },[])
    
    
    return (
        <div className='App'>
            <ApolloProvider client={client}>

                <Router history={history}>
                    <Nav/>
                    <Switch>
                        <Route exact path='/' component={Home} />
                        <Route exact path='/movie/:id' component={MovieDetails} />
                        <Route exact path='/genres' component={Genres} />
                        <Route exact path='/mylist' component={Watchlist} />
                    </Switch>
                    <ModalContainer />
                </Router>

            </ApolloProvider>
        </div>
    )
}

export default App
