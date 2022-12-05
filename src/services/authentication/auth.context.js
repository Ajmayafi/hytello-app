import React, { createContext, useState, useEffect, useReducer, useContext } from "react";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { doc, onSnapshot } from "firebase/firestore";
import { db } from "../../../config";

export const AuthContext = createContext();


const AuthReducer = (state, action) => {
  switch(action.type) {
     case 'AUTH_IS_READY':
     return {...state, authIsReady: true, user: action.payload[1], userData: action.payload[0]}
     case 'LOGIN':
      return { ...state, user: action.payload[1], userData: action.payload[0] }
     case 'UPDATE_USER':
      return { ...state, user: action.payload[1], userData: action.payload[0] }
      case 'UPDATE_ACCOUNT_DETAILS':
        return { ...state, accountDetails: action.payload, authenticated: true }
     case 'REGISTER':
      return { ...state, user: action.payload }
     case 'LOGOUT':
      return { ...state, user: null, userData: null, authenticated: false, loginPin: null, accountDetails: null }
        case 'UPDATE_PIN':
        return { ...state, loginPin: action.payload }
        case 'CREATE_PIN':
          return { ...state, loginPin: action.payload }
      case 'NO_USER':
        return { ...state, authIsReady: true }
      case 'UPDATE_AUTHENTICATED': 
       return { ...state, authenticated: true }
       case 'UPDATE_DARKMODE': 
       return { ...state, darkMode: action.payload }
      default:
        return state
  }
}


export const AuthContextProvider = ({ children }) => {
     const [state, dispatch] = useReducer(AuthReducer, {
      user: null,
      authIsReady: false,
      userData: null,
      accountDetails: null,
      loginPin: null,
      authenticated: false,
      darkMode: true
     })  

    
     useEffect(() => {
      async function checkUser() {
       try {
         const jsonValue = await AsyncStorage.getItem('@userdata')
         const jData = JSON.parse(jsonValue)
         if(jsonValue !== null) {
          const value = await AsyncStorage.getItem('@login_pin')
          if(value !== null) {
             dispatch({ type: 'UPDATE_PIN', payload: value})
          }   
            dispatch({ type: 'AUTH_IS_READY', payload: JSON.parse(jsonValue)})
         }
         dispatch({ type: 'NO_USER'})
       } catch(e) {
         console.log(e) 
       }
      }

      checkUser()


    }, [])

    // useEffect(() => {
    //   if(state.user && state.authenticated) {
    //     let data = []
    //     onSnapshot(doc(db, "users", state.user.id), (doc) => {
    //       const source = doc.metadata.hasPendingWrites ? "Local" : "Server";
    //       data = [state.userData, doc.data()]
    //        AsyncStorage.setItem('@userdata', JSON.stringify(data))
    //       if(doc.data() !== state.user) {
    //         dispatch({ type: 'UPDATE_USER', payload: data})
    //       }
          
    //     })
    //   }
    //  }, [state.user, state.authenticated])


  
  return (
    <AuthContext.Provider value={{ ...state, dispatch }}>
    {children}
    </AuthContext.Provider>
  )
}