import React from "react";
import { createStackNavigator } from '@react-navigation/stack';

const Stack = createStackNavigator();

export const PinNavigator = () => {
  return (
       <Stack.Navigator headerMode="none">
      <Stack.Screen
        name="PINLOGIN"
        component={PaymentScreen}
        options={{
          headerTitleStyle: {
            alignSelf: 'center',
          },
        }}
      />
      <Stack.Screen name="CREATE PIN"
        options={{
        headerBackVisible: true,
         headerBackTitleVisible: false,
         title: "Send Money",
       }}
       component={SendScreen} />
    </Stack.Navigator>
  )
}


