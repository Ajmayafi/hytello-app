import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { DashBoardScreen } from "../features/dashboard/screens/dashboard.screen"; 
import { AddMoneyScreen } from "../features/dashboard/screens/top-up.screen";
import { PaystackScreen } from "../features/payment/screens/paystack.screen";
import { TopUpSuccessScreen } from "../features/payment/screens/top-up.success.screen";
import { ViewTransactionScreen } from "../features/dashboard/screens/view-transaction.screen";
import { useAuthStates } from "../hooks/useAuthStates";

const Stack = createStackNavigator();
 
export const DashboardNavigator = () => {
  const { darkMode }  = useAuthStates()
  return (
    <Stack.Navigator
    screenOptions={{
      headerMode: "screen",
    }}
    >
      <Stack.Screen name="Dashboard" component={DashBoardScreen} 
       options={{
          headerTitleStyle: {
            alignSelf: 'center',
          },
          header: () => null
       }}
      />
       <Stack.Screen name="ViewTransaction"
       options={{
         headerBackTitleVisible: false,
         headerTintColor: darkMode ? "white" : "black",
         title: "Transaction Details",
          headerStyle: {
        backgroundColor: darkMode ? '#1A1A1A' : "white"
       }
       }}
        component={ViewTransactionScreen} />
      <Stack.Screen name="PayWithPaystack"
          options={{
          header: () => null,
        }}
       component={PaystackScreen} />
    
    </Stack.Navigator>
  );
}
