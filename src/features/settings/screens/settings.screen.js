import React from "react";
import { SettingsScreen } from "./settings.index.screen";
import { ProfileScreen } from "./profile.screen";
import { createStackNavigator } from '@react-navigation/stack';

const Stack = createStackNavigator();

export const SettingsNavigator = () => {
  return (
    <Stack.Navigator
    screenOptions={{
      headerMode: "screen",
    }}
    >
      <Stack.Screen name="Settings"
        options={{
          header: () => null,
          headerTintColor: "#52ab98"
        }}
       component={SettingsScreen} />
      <Stack.Screen name="Profile" options={{
        headerTintColor: "#52ab98"
      }} component={ProfileScreen} />
    </Stack.Navigator>
  );
}