import React, { useContext } from "react";
import { useAuthStates } from "../hooks/useAuthStates";
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { SettingsNavigator } from "../features/settings/screens/settings.screen";  
import { PaymentNavigator } from "./payment.navigation";
import { DashboardNavigator } from "./dashboard.navigation";
import { TransactionsProvider } from "../services/transactions/transactions.context";
import { OverviewScreen } from "../features/overview/screens/overview.screen";
import { SendScreen } from "../features/payment/screens/send-money.screen";
import { AddMoneyScreen } from "../features/dashboard/screens/top-up.screen";
import { TopUpSuccessScreen } from "../features/payment/screens/top-up.success.screen";
import { CardsNavigator } from "./cards.navigation";
import { BuyAirtimeScreen } from "../features/payment/buy-airtime.screen";
import { WithdrawFundScreen } from "../features/cards/screens/withdraw-funds.screen";
import { AddFundsToCardScreen } from "../features/cards/screens/add-card-funds.screen";
import { CardDetailsScreen } from "../features/cards/screens/card-details.screen";
import { TransactionsScreen } from "../features/transactions/transactions.screen";
import { CardControlsScreen } from "../features/cards/screens/card.manage-controls.screen";
import { ChangeCardPinScreen } from "../features/cards/screens/card.change-pin.screen";
import { UserInfoScreen } from "../features/account/screens/user-info.screen";
import { ConfirmScreen } from "../features/payment/confirm-payment.screen";
import { ViewCardPinScreen } from "../features/cards/screens/card.view-pin.screen";
import { Ionicons } from "@expo/vector-icons";
import { SecurityScreen } from "../features/security/screens/security.screen";
import { CreateCardScreen } from "../features/cards/screens/create.card.screen";
import { CameraScreen } from "../features/settings/screens/camera.screen";
import { View, Text } from "react-native";

const Stack = createStackNavigator();


const Tab = createBottomTabNavigator();

const TAB_ICON = {
  DashboardTab: "home-outline",
  PaymentTab: "wallet-outline",
  SettingsTab: "md-settings",
  OverviewTab: "pie-chart",
  CardsTab: "md-card-outline"
};


const createScreenOptions = ({ route }) => {
  const iconName = TAB_ICON[route.name];

  const { darkMode } = useAuthStates()

  return {
    tabBarIcon: ({ size, color }) => (
      <Ionicons name={iconName} size={size} color={color} />
    ),
    tabBarActiveTintColor: "#52ab98",
    tabBarInactiveTintColor: "gray",
    tabBarStyle: {
     backgroundColor: darkMode ? "black" : "white"
    }
  };
};

const HomeNav = () => (
  <Tab.Navigator
            screenOptions={createScreenOptions} >
            <Tab.Screen name="DashboardTab" 
            options={{
              header: () => null,
              title: "Dashboard",
            }}
            component={DashboardNavigator} />
            <Tab.Screen name="PaymentTab" 
               options={{
              header: () => null,
              title: "Payment",
              headerBackTitleVisible: false,
            }}
            component={PaymentNavigator} />
              <Tab.Screen name="OverviewTab" 
                   options={{
                    title: "Overview",
                    header: () => null,
                  }}
              component={OverviewScreen} />
                 <Tab.Screen name="CardsTab" 
                   options={{
                    title: "Cards",
                    header: () => null,
                  }}
              component={CardsNavigator} />
            <Tab.Screen 
                options={{
              header: () => null,
              title: "Settings"
            }}
            name="SettingsTab" component={SettingsNavigator} />
          </Tab.Navigator>
)

export const AppNavigator = () => {
   const { user, authenticated, loginPin, darkMode } = useAuthStates()
   

    return (
    <TransactionsProvider>
          <Stack.Navigator>
      {user && !user.verified ? <Stack.Screen
            options={{
              header: () => null,
              headerTintColor: "#52ab98"
            }}
            name="User Info Verify"
            component={UserInfoScreen}
          />
      : 
      user && authenticated === false ? <Stack.Screen
      options={{
        header: () => null,
        headerTintColor: "#52ab98"
      }}
      name="Security"
      component={SecurityScreen}
A         />    
      : 
      user && user.verified && loginPin && authenticated === true ?
      <>
      <Stack.Screen
      options={{
        header: () => null,
        headerTintColor: "#52ab98"
      }}
      name="HomeTab"
      component={HomeNav}
    />
    <Stack.Screen name="SendMoney"
      options={{
        headerBackTitleVisible: false,
         headerTintColor: darkMode ? "white" : "black",
          headerStyle: {
        backgroundColor: darkMode ? '#1A1A1A' : "white"
          },
       headerTintColor: "#52ab98",
       title: "Send Money",
     }}
     component={SendScreen} />
     <Stack.Screen name="Confirm"
      options={{
      headerBackVisible: true,
       headerBackTitleVisible: false,
       headerTintColor: "white",
       title: "Confirm",
       headerTitleAlign: 'center',
       headerStyle: {
        backgroundColor: '#52ab98'
       }
     }}
     component={ConfirmScreen} />
        <Stack.Screen name="AddMoney"
      options={{
        headerBackTitleVisible: false,
         headerTintColor: darkMode ? "white" : "black",
          headerStyle: {
        backgroundColor: darkMode ? '#1A1A1A' : "white"
          },
       title: "Add Money",
       headerTintColor: "#52ab98"
     }}
     component={AddMoneyScreen} />
      <Stack.Screen name="TopUpSuccess"
        options={{
        header: () => null,
        gestureEnabled: false,
      }}
     component={TopUpSuccessScreen} />
       <Stack.Screen name="Buy Airtime"
        options={{
          headerBackTitleVisible: false,
          headerBackVisible: true,
          headerTintColor: darkMode ? "white" : "black",
          headerStyle: {
        backgroundColor: darkMode ? '#1A1A1A' : "white"
          },
      }}
     component={BuyAirtimeScreen} />
        <Stack.Screen name="Fund Card"
        options={{
          headerBackTitleVisible: false,
          headerBackVisible: true,
          headerTintColor: "#52ab98"
      }}
     component={AddFundsToCardScreen} />
        <Stack.Screen name="Create Card"
        options={{
          headerBackTitleVisible: false,
          headerBackVisible: true,
          headerTintColor: "#52ab98"
      }}
     component={CreateCardScreen} />
        <Stack.Screen name="View Card Details"
        options={{
          headerBackTitleVisible: false,
          headerBackVisible: true,
          headerTintColor: "#52ab98"
      }}
     component={CardDetailsScreen} />
       <Stack.Screen name="Camera"
        options={{
          header: () => null
      }}
     component={CameraScreen} /> 
        <Stack.Screen name="Withdraw Card Funds"
        options={{
          headerBackTitleVisible: false,
          headerBackVisible: true,
          headerTintColor: "#52ab98"
      }}
     component={WithdrawFundScreen} />
               <Stack.Screen name="Manage Card Controls"
        options={{
          headerBackTitleVisible: false,
          headerBackVisible: true,
          headerTintColor: "#52ab98"
      }}
     component={CardControlsScreen} />
               <Stack.Screen name="View Card Pin"
        options={{
          headerBackTitleVisible: false,
          headerBackVisible: true,
          headerTintColor: "#52ab98"
      }}
     component={ViewCardPinScreen} />
               <Stack.Screen name="Change Card Pin"
        options={{
          headerBackTitleVisible: false,
          headerBackVisible: true,
          headerTintColor: "#52ab98"
      }}
     component={ChangeCardPinScreen} />  
    
      </>      
      : null
    }
    </Stack.Navigator>
          </TransactionsProvider>
);

      }