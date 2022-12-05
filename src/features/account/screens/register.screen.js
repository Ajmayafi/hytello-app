import React, { useState, useContext, useEffect } from "react";
import { ScrollView, Alert } from "react-native";
import styled from "styled-components/native";
import LottieView from "lottie-react-native";
import { Button, TextInput, Provider } from "react-native-paper";
import { ProgressBar } from "../../../components/progress-bar.component";
import { NewErrorComponent } from "../../../components/new-error.component";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../../../config";
import { db } from "../../../../config";
import { doc, setDoc, getDoc, serverTimestamp } from "firebase/firestore";
import { useAuthStates } from "../../../hooks/useAuthStates";
import AsyncStorage from '@react-native-async-storage/async-storage';

const LoginBackground = styled.ImageBackground.attrs({
 source: require("../../../images/bg.jpg"),
})`
flex: 1;
width: 100%;
height: 100%
`;

//NEW


const ScrollWrapper = styled(ScrollView).attrs({
  contentContainerStyle: {
    justifyContent: 'center',
    alignItems: 'center',
  }
})`
`;

const RegisterContainer = styled.View`
align-items: center;
justify-content: center;
margin: auto;
margin-top: 45px;
padding-bottom: 25px;
width: 100%;
height: 100%;
`;

const BgAniWapper = styled.View`
width: 100%;
position: absolute;
height: 100%;
`;



const Title = styled.Text`
font-size: 34px;
color: black;
text-align: center;
padding-bottom: 20px;
font-family: ${(props) => props.theme.fonts.title}
`;

const ButtonStyled = styled(Button)`
width: 160px;
padding: 12px;
background-color: ${(props) => props.theme.colors.ui.color};
font-size: 25px;
margin: auto;
margin-bottom: 13px;
`;

const ButtonWrapper = styled.View`
 padding-top: 40px;
`;

const Input = styled(TextInput)`
width: 290px;
margin-bottom: 13px;
`;

export const RegisterScreen = ({ navigation }) => {
  const [email, setEmail] = useState(null)
  const [phonenumber, setPhoneNumber] = useState(null)
  const [firstName, setFirstName] = useState(null)
  const [lastName, setLastName] = useState(null)
  const [password, setPassword] = useState(null)
  const [inputError, setInputError] = useState(null)
  const [loading, setLoading] = useState(false)

  const { dispatch } = useAuthStates()


  const registerUser = async ()  => {
    setInputError(null)
    let data = []
    try{
   setLoading(true)
   const res = await createUserWithEmailAndPassword(auth, email, password)

   await setDoc(doc(db, "users", res.user.uid), {
    first_name: firstName.trim(),
    last_name: lastName.trim(),
    country: 'Nigeria',
    phone_number: phonenumber.trim(),
    email: email.trim(),
    id: res.user.uid,
    active: true,
    verified: false,
    joined: serverTimestamp()
  })


  // CHECK IF THE USER HAS AN ACCOUNT

  const docRef = doc(db, "users", res.user.uid);
   const docSnap = await getDoc(docRef);
   if (docSnap.exists()) {
    data = [res.user, docSnap.data()]
    console.log("Document data:", data);
    await AsyncStorage.setItem("@userdata", JSON.stringify(data))
    dispatch({ type: 'LOGIN', payload: data})
    setLoading(false)
  } else {
    console.log("Unfortunately this document is not found!");
    setLoading(false)
  }
  console.log(res.user)
  console.log(docSnap.data())
}  
  catch(error) {
     setInputError(error.message)
     setLoading(false)
     Alert.alert(
      "Error",
      `${error.message}`,
      [{ text: "Okay", onPress: () => setLoading(false) }],
      {
        cancelable: true,
      }
    );
  }
   
}

  const handleRegister = () => {
    const emailStr = '@';
    setInputError(null)
    if(!email || !password || !phonenumber || !firstName || !lastName) {
      Alert.alert(
        "Error",
        "All input must be filled",
        [{ text: "Okay", onPress: () => setLoading(false) }],
        {
          cancelable: true,
        }
      );
      return 
    }
    if(email.includes(emailStr)) {
       registerUser()
    } else {
      Alert.alert(
        "Error",
        "Please enter a valid email",
        [{ text: "Okay", onPress: () => setLoading(false) }],
        {
          cancelable: true,
        }
      );
      return 
    }
  }


  return (
      <Provider>
      <LoginBackground>
      <BgAniWapper>
         <LottieView
          key="animation"
          autoPlay
          loop
          resizeMode="cover"
          source={require("../animations/background.json")}
        />
        </BgAniWapper>
   {loading && <ProgressBar /> }
   
    <ScrollView>
    <RegisterContainer>
    <Title>Register</Title>
     <Input
      label="First Name"
       onChangeText={(text) => setFirstName(text)}
        textContentType="name"
        theme={{ colors: { primary: '#52ab98'}}}
        keyboardType="default"
    />
    <Input
      label="Last Name"
       onChangeText={(text) => setLastName(text)}
        textContentType="name"
        theme={{ colors: { primary: '#52ab98'}}}
        keyboardType="default"
    />
      <Input
      label="Email"
        onChangeText={(text) => setEmail(text)}
        textContentType="emailAddress"
        keyboardType="email-address"
        theme={{ colors: { primary: '#52ab98'}}}
         autoCapitalize="none"
    />
          <Input
      label="Phone Number"
        onChangeText={(text) => setPhoneNumber(text)}
        textContentType="decimal-pad"
        multiline={false}
        maxLength={11}
        theme={{ colors: { primary: '#52ab98'}}}
        keyboardType="phone-pad"
    />
     <Input
      label="Password"
        onChangeText={(text) => setPassword(text)}
        textContentType="password"
        theme={{ colors: { primary: '#52ab98'}}}
      secureTextEntry
    />
    <ButtonWrapper>
    {!loading && <ButtonStyled onPress={() => handleRegister()} icon="lock" mode="contained"> Register</ButtonStyled>}
     {loading && <ButtonStyled  icon="lock" mode="contained"> Register</ButtonStyled>}
  </ButtonWrapper>
    </RegisterContainer>
    </ScrollView>
    </LoginBackground>
    </Provider>
   
  );
}