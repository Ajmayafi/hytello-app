import React from 'react';
import { ThemeProvider } from "styled-components/native";
import { StatusBar as ExpoStatusBar } from "expo-status-bar";
import { SafeArea } from "./src/components/safe-area.component";
import { Navigation } from "./src/navigation/index";
import { LogBox } from "react-native";
import { AuthContextProvider } from "./src/services/authentication/auth.context";
import {
  useFonts as useRoboto,
  Roboto_400Regular,
} from '@expo-google-fonts/roboto';

import {
  useFonts as useDarker,
  DarkerGrotesque_400Regular,
} from '@expo-google-fonts/darker-grotesque';





import { theme } from "./src/infrastructure/theme/index";

export default function App() {
  let [robotoLoded] = useRoboto({
    Roboto_400Regular,
  });

  let [darkerLoader] = useDarker({
    DarkerGrotesque_400Regular,
  });


  if(!robotoLoded || !darkerLoader) {
    return
  }

  LogBox.ignoreLogs(["EventEmitter.removeListener"]);
  
  return (
        <ThemeProvider theme={theme}>
     <AuthContextProvider>
      <SafeArea>
      <Navigation />
      </SafeArea>
      <ExpoStatusBar style="auto" />
     </AuthContextProvider>
     </ThemeProvider>
  )
}
