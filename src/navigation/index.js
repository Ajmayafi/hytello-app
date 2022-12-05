import React, { useEffect, useState } from "react"
import { NavigationContainer } from '@react-navigation/native';
import { useAuthStates } from "../hooks/useAuthStates";
import { AccountNavigator } from "./account.navigation";
import { AppNavigator } from "./app.navigation";

export const Navigation = () => {
  const { user, authIsReady } = useAuthStates()
   
  if(!authIsReady) {
    return null
  }
 
  return (
     <NavigationContainer>
      {user ? <AppNavigator /> : <AccountNavigator />}
     </NavigationContainer>
  )
}