const { createContext } = require("react")

import React, {createContext,useReducer} from 'react'
import AppReducer from './AppReducer'

// state
const initialState={
    user:{},
    error:''
}

export const GlobalContext=createContext(initialState)

