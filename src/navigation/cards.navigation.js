import React from "react";
import { createStackNavigator } from '@react-navigation/stack';
import { CardsScreen } from "../features/cards/screens/cards.screen";

const Stack = createStackNavigator()


export const CardsNavigator = () => {
  
  return (
     <Stack.Navigator
     gestureEnabled="true"
     screenOptions={{  
     }}
     >
     <Stack.Screen name="Cards"
      options={{
        header: () => null,
      }}
       component={CardsScreen} />
    </Stack.Navigator>
  )
}