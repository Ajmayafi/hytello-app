import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { PaymentScreen } from '../features/payment/screens/payment.screen';
import { useAuthStates } from '../hooks/useAuthStates';

const Stack = createStackNavigator();

export const PaymentNavigator = () => {
  const { darkMode } =  useAuthStates()
  return (
    <Stack.Navigator screenOptions={{
      headerMode: "screen",
    }}>
      <Stack.Screen
        name="Payment"
        component={PaymentScreen}
        options={{
          headerTitleAlign: 'center',
          headerTintColor: darkMode ? "white" : "black",
          headerStyle: {
        backgroundColor: darkMode ? '#1A1A1A' : "white"
          },
        }}
     />
    </Stack.Navigator>
  );
};
