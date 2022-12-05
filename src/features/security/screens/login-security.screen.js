import React, { useEffect, useState, useCallback } from 'react';
import styled from "styled-components/native";
import { IconButton, Avatar, Button, ActivityIndicator } from 'react-native-paper';
import { View, TextInput, Alert, Platform, Vibration } from "react-native";
import { Ionicons } from '@expo/vector-icons';
import * as LocalAuthentication from 'expo-local-authentication';
import { useAuthStates } from '../../../hooks/useAuthStates';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useFocusEffect } from '@react-navigation/native';



export const LoginSecurityScreen = () => {
  const [pinInput, setPinInput] = useState('')
  const [isBiometricSupported, setIsBiometricSupported] = useState(false)
  const [fingerprint, setFingerprint] = useState(false)
  const [loading, setLoading] = useState(false)
  const [photo, setPhoto] = useState(null)
  
  
  const arrayMap = [{}, {}, {}, {}]
  
  const { loginPin, dispatch, user, darkMode } = useAuthStates()

  const pLength = pinInput.split("")


  const Background = styled.View`
flex: 1;
justify-content: center;
padding: 12px;
background-color: ${darkMode ? "#1A1A1A" : "white"};
`;

const AvatarHeader = styled.View`
align-items: center;
justify-content: center;
`;

const Header  = styled.View`
align-self: center;
justify-content: center;
`;

const Row  = styled.View`
flex-direction: row;
justify-content: space-evenly;
`;

const HeaderTitle = styled.Text`
text-align: center;
font-size: 27px;
color: ${darkMode ? "white" : "black"};
`;

const Name = styled.Text`
text-align: center;
font-size: 20px;
padding: 5px;
color: ${darkMode ? "white" : "black"};
`;

const Title = styled.Text`
text-align: center;
font-size: 16px;
color: ${darkMode ? "white" : "black"};
`;


  const vibrate = () => {
    if (Platform.OS === 'ios') {
      const interval = setInterval(() => Vibration.vibrate(), 1000);
      setTimeout(() => clearInterval(interval), 2000);
    } else {
      Vibration.vibrate(10000);
    }
  };

  const handleGetVirtualAccountDetails = async () => {
    setLoading(true)
    try {
      const res = await fetch('https://api.hytello.com.ng/get-virtual-details', {
        method: 'post',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({
          ref: user.kuda_ref
        })
      })
      const data = await res.json()
      if(res.status === 200) {
        setLoading(false)
        dispatch({ type: 'UPDATE_ACCOUNT_DETAILS', payload: data })
      }else {
        setLoading(false)
        Alert.alert(
          "Sorry",
          "We are having trouble login you in, please try again",
          [{ text: "Okay", onPress: () => null }],
          {
            cancelable: true,
          }
        )
      }
    } catch(error) {
      setLoading(false)
      Alert.alert(
        "Sorry",
        "Error occured, please try again",
        [{ text: "Okay", onPress: () => null }],
        {
          cancelable: true,
        }
      )
    }
  }

  const handleCheck = () => { 
    if(pinInput.length < 4) {
      Alert.alert(
        "Error",
        "The pin you entered is less than 4",
        [{ text: "Okay", onPress: () => null }],
        {
          cancelable: true,
        }
      )
      return
    }

     if(pinInput === loginPin) {
      handleGetVirtualAccountDetails()

     }else {
      Alert.alert(
        "Error",
        "Invalid pin",
        [{ text: "Okay", onPress: () => {
          vibrate()
          setPinInput('') 
        }}],
        {
          cancelable: false,
        }
      )
     }
  }

  const handleAdd = (value) => {
         const newValue = pinInput + value;
         pinInput.length < 4 ? setPinInput(newValue) : null
  }

  const handleDelete  = () => {
     const newValue = pinInput.slice(0, -1);
     setPinInput(newValue)
  }

  const handle = async () => {
    try {
        const biometricAuth = await LocalAuthentication.authenticateAsync({
            disableDeviceFallback: true,
            cancelLabel: "Cancel",
        });
        if (biometricAuth.success) {
          handleGetVirtualAccountDetails()
        }
    } catch (error) {
        console.log(error);
    }
};

const handleLogout = async () => {
  try{
    await AsyncStorage.removeItem("@userdata")
    await AsyncStorage.removeItem("@login_pin")
    dispatch({ type: 'LOGOUT'})
  } catch(error) {
    console.log(error)
  }
}

const getProfilePicture = async (currentUser) => {
  const photoUri = await AsyncStorage.getItem(`${user.id}-photo`);
  setPhoto(photoUri);
};

useFocusEffect(
  useCallback(() => {
    getProfilePicture(user);
  }, [user])
);

  useEffect(() => {
    (async () => {
        const compatible = await LocalAuthentication.hasHardwareAsync();
        setIsBiometricSupported(compatible);
        const enroll = await LocalAuthentication.isEnrolledAsync();
        if (enroll) {
            setFingerprint(true);
        }
    })()
}, [])

  return  (
    <Background>
    <AvatarHeader>
    {!photo && (
            <Avatar.Icon size={115} icon="human" backgroundColor="#2182BD" />
          )}
   {photo && <Avatar.Image size={115} label="AJ" source={{ uri: photo }}  /> }
    <HeaderTitle>Welcome Back</HeaderTitle>
    <Name>{user.first_name + " " + user.last_name}</Name>
    </AvatarHeader>
    <Header>
     {!pinInput && <Title>Enter your pin</Title> }
     <Row>
     {!pinInput && arrayMap.map((i) => (
      <Ionicons name='md-radio-button-off-outline' color={darkMode ? "white" : "black"} size={34}  />
     ))}
       </Row>
       <Row>
     {pinInput && pLength.map((i) => (
       <Ionicons name='md-radio-button-on' color={darkMode ? "white" : "black"} size={34} />
     ))}
      </Row>
    </Header>
    <Row>
    <IconButton
    icon="numeric-1"
    color={darkMode ? "white" : "black" }
    size={45}
    style={{ marginTop: 15}}
    onPress={() => handleAdd('1')}
  />
   <IconButton
    icon="numeric-2"
    color={darkMode ? "white" : "black" }
    size={45}
    style={{ marginTop: 15}}
    onPress={() => handleAdd('2')}
  />
   <IconButton
    icon="numeric-3"
    color={darkMode ? "white" : "black" }
    size={45}
    style={{ marginTop: 15}}
    onPress={() => handleAdd('3')}
  />
    </Row>
    <Row>
    <IconButton
    icon="numeric-4"
    color={darkMode ? "white" : "black" }
    size={45}
    style={{ marginTop: 15}}
    onPress={() => handleAdd('4')}
  />
   <IconButton
    icon="numeric-5"
    color={darkMode ? "white" : "black" }
    size={45}
    style={{ marginTop: 15}}
    onPress={() => handleAdd('5')}
  />
   <IconButton
    icon="numeric-6"
    color={darkMode ? "white" : "black" }
    size={45}
    style={{ marginTop: 15}}
    onPress={() => handleAdd('6')}
  />
    </Row>
    <Row>
    <IconButton
    icon="numeric-7"
    color={darkMode ? "white" : "black" }
    size={45}
    style={{ marginTop: 15}}
    onPress={() => handleAdd('7')}
  />
   <IconButton
    icon="numeric-8"
    color={darkMode ? "white" : "black" }
    size={45}
    style={{ marginTop: 15}}
    onPress={() => handleAdd('8')}
  />
   <IconButton
    icon="numeric-9"
    color={darkMode ? "white" : "black" }
    size={45}
    style={{ marginTop: 15}}
    onPress={() => handleAdd('9')}
  />
    </Row>
    <Row>
   {pinInput && <IconButton
    icon="backspace"
    color={darkMode ? "white" : "black" }
    size={45}
    style={{ marginTop: 15}}
    onPress={() => handleDelete()}
  /> }
  {!pinInput && <IconButton
    icon="logout"
    color={darkMode ? "white" : "black" }
    size={45}
    style={{ marginTop: 15}}
    onPress={() => handleLogout()}
  />}
   <IconButton
    icon="numeric-0"
    color={darkMode ? "white" : "black" }
    size={45}
    style={{ marginTop: 15}}
    onPress={() => handleAdd('0')}
  />
   {!isBiometricSupported || !fingerprint && !pinInput && !loading && <IconButton
    icon="arrow-collapse-right"
    color={darkMode ? "white" : "black" }
    size={45}
    style={{ marginTop: 15}}
    onPress={() => handleCheck()}
  />}
  {pinInput && !loading && <IconButton
    icon="arrow-collapse-right"
    color={darkMode ? "white" : "black" }
    size={45}
    style={{ marginTop: 15}}
    onPress={() => handleCheck()}
  />}
     {isBiometricSupported && fingerprint && !pinInput && !loading && <IconButton
    icon={Platform.OS === "android" ? "fingerprint" : "face-recognition"}
    color={darkMode ? "white" : "black" }
    size={45}
    style={{ marginTop: 15}}
    onPress={() => handle()}
  /> }
  {loading && <ActivityIndicator size={35} color="teal" />}
    </Row>
    </Background>
  )
}