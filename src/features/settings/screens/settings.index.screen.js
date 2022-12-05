import React, { useContext, useState, useCallback } from "react";
import { useAuthServices } from "../../../hooks/useAuthServices";
import { useAuthStates } from "../../../hooks/useAuthStates";
import { ScrollView, TouchableOpacity } from "react-native"
import { Avatar, List, Switch, Surface } from 'react-native-paper';
import LottieView from "lottie-react-native";
import styled from "styled-components/native";
import { BackgroundAnimationWrapper } from "../../../components/pagesanimation";
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as MailComposer from 'expo-mail-composer';
import { useFocusEffect } from "@react-navigation/native";

const SettingsBackground = styled.View`
width: 100%;
height: 100%;
`;

const SettingsBgAni = styled.View`
position: absolute;
width: 100%;
height: 100%
`;

const TitleNum = styled.Text`
font-family: ${(props) => props.theme.fonts.heading};
font-size: 24px;
`;

const AvatarContainer = styled.View`
align-items: center;
margin-top: 12px;
`;

const Title = styled.Text`
padding-top: 20px;
font-family: ${(props) => props.theme.fonts.title};
font-size: 28px;
`;

const SetIBackground  = styled(Surface)`
margin: 10px;
border-radius: 10px;
`;

const SettingsItem = styled(List.Item)`

`;

const VersionTitle = styled.Text`
font-size: 13px;
color: white;
text-align: center;
`;

export const SettingsScreen = ({ navigation }) => {
  const { user, accountDetails, dispatch, darkMode } = useAuthStates()
  const [isdarkMode, setDarkMode] = useState(darkMode);
   const [photo, setPhoto] = useState(null);


   
  const logout = async () => {
    try{
      await AsyncStorage.removeItem("@userdata")
      await AsyncStorage.removeItem("@login_pin")
      await AsyncStorage.removeItem(`${user.id}-photo`)
      dispatch({ type: 'LOGOUT'})
    } catch(error) {
      console.log(error)
    }
  }

   const str = user.first_name;

   const getProfilePicture = async (currentUser) => {
     const photoUri = await AsyncStorage.getItem(`${user.id}-photo`);
     setPhoto(photoUri);
   };
 
   useFocusEffect(
     useCallback(() => {
       getProfilePicture(user);
     }, [user])
   );
 

  return (
     <SettingsBackground>
      <ScrollView>
      <SettingsBgAni>
        {!darkMode && <LottieView
          key="animation"
          autoPlay
          loop
          resizeMode="cover"
          source={require("../../../animations/settingsbackground.json")}
        /> }
         {darkMode && <LottieView
          key="animation"
          autoPlay
          loop
          resizeMode="cover"
          source={require("../../../animations/dark-modebg2.json")}
        /> }
        </SettingsBgAni>
      <AvatarContainer>
      <TouchableOpacity onPress={() => navigation.navigate("Camera")}>
          {!photo && (
            <Avatar.Icon size={120} icon="human" backgroundColor="#2182BD" />
          )}
          {photo && (
            <Avatar.Image
              size={120}
              source={{ uri: photo }}
              backgroundColor="#2182BD"
            />
          )}
        </TouchableOpacity>
       {/* <Avatar.Text elevation={3} size={120} style={{ backgroundColor: 'white'}} label={str.substring(0, 1)} /> */}
       <Title>{user.first_name + ' ' + user.last_name}</Title>
       <TitleNum>{accountDetails.accountNumber ? accountDetails.accountNumber : ''}</TitleNum>
       </AvatarContainer>
       <List.Section>
        <SetIBackground>
         <SettingsItem
    onPress={() => navigation.navigate("Profile")}
    title="Profile"
    description="View your profile details"
    left={props => <List.Icon {...props} icon="account" />}
  />
  </SetIBackground>
  <SetIBackground>
         <SettingsItem
    title="Settings"
    description="Edit your account details"
    left={props => <List.Icon {...props} icon="wrench" />}
  />
  </SetIBackground>
  <SetIBackground>
    <SettingsItem
    title="Support"
    description="Get in touch with us"
    onPress={() => {
      MailComposer.composeAsync({
        recipients: 
        ['help@hytello.com.ng'],
        subject: 'I Need Help..',
        body: 'Your issue here...',
      });
    }}
    left={props => <List.Icon {...props} icon="phone" />}
  />
  </SetIBackground>
  <SetIBackground>
    <SettingsItem
    title="Dark mode"
    description="Customize the app appearance"
    left={props => <List.Icon {...props} icon="cog-outline" />}
    right={props =>  <Switch value={isdarkMode} size={10} onValueChange={() => {
      dispatch({ type: 'UPDATE_DARKMODE', payload: !darkMode})
    }} />} 
  />
  </SetIBackground>
  <SetIBackground>
    <SettingsItem
     onPress={() => logout()}
    title="Log out"
    description="Sign in out your account"
    left={props => <List.Icon {...props} icon="arrow-right-bold-box-outline" />}
  />
  </SetIBackground>
       </List.Section>
       <VersionTitle>V1.0</VersionTitle>
       </ScrollView>
       </SettingsBackground>
  )
}