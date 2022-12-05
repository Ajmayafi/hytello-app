import React, { useState } from "react";
import { useAuthStates } from "./useAuthStates";
import AsyncStorage from '@react-native-async-storage/async-storage'; 

export const useAuthServices = () => {
    const [loginError, setLoginError] = useState(null);
    const [registerError, setRegisterError] = useState(null);
    const [loading, setLoading] = useState(false);
 

    const { dispatch } = useAuthStates()

    const clearAllErrors = () => {
        setLoginError(null)
        setRegisterError(null)
    }
 
    const login = async (email, password) => {
        setLoginError(null)
       try {
           setLoading(true)
            const res = await fetch('https://twirfyfinance.herokuapp.com/signin', {
               method: 'post',
               headers: {'Content-Type': 'application/json'},
               body: JSON.stringify({
                 email,
                 password
               })
              })

              const data = await res.json();
              
              if(res.status === 200) {
                 setLoading(false)
                dispatch({ type: 'LOGIN', payload: data})
                      try {
            const jsonValue = JSON.stringify(data)
           await AsyncStorage.setItem('@user', jsonValue)
          } catch (e) {
          // saving error
           }
                  
              }else if(res.status === 400) {
               setLoading(false)
                 setLoginError("Incorrect details")
              } else {
                setLoading(false)
                setLoginError("Something went wrong")
              }

       } catch(err) {
          setLoading(false)
          setLoginError("Incorrect details")
         console.log(err)
       }

        
   }




const logout = async () => {
    dispatch({ type: 'LOGOUT' })
          try {
       await AsyncStorage.removeItem('@user')
     } catch (e) {
  // saving error
    console.log(e)
   }

  }

  return { login, register, logout, loading, loginError, clearAllErrors, registerError, handleAccountVerificationUpdate }

}