import React, { useState, useContext, useEffect } from "react";
import styled from "styled-components/native";
import LottieView from "lottie-react-native";
import { Alert } from "react-native";
import { Button, TextInput, Provider  } from "react-native-paper";
import { ProgressBar } from "../../../components/progress-bar.component";
import { ErrorComponent } from "../../../components/error.component";
import { NewErrorComponent } from "../../../components/new-error.component"
import { auth } from "../../../../config";
import {  signInWithEmailAndPassword } from "firebase/auth";
import { db } from "../../../../config";
import { doc, getDoc } from "firebase/firestore";
import { useAuthStates } from "../../../hooks/useAuthStates";
import AsyncStorage from '@react-native-async-storage/async-storage';


const LoginBackground = styled.ImageBackground.attrs({
source: require("../../../images/bg.jpg"),  
})`
flex: 1;
`;

const LoginContainer = styled.View`
position: absolute;
width: 100%;
height: 100%;
align-items: center;
justify-content: center;
margin: auto;
`;

const Title = styled.Text`
font-size: 34px;
color: black;
text-align: center;
font-family: ${(props) => props.theme.fonts.title}
padding-bottom: 20px;
`;

const ButtonStyled = styled(Button)`
width: 160px;
padding: 12px;
background-color: ${(props) => props.theme.colors.ui.color};
font-size: 25px;
margin-bottom: 13px;
`;

const ButtonWrapper = styled.View`
 padding-top: 40px;
`;

const Input = styled(TextInput)`
width: 290px;
margin-bottom: 13px;
`;

const ErrorViewer = styled.View`
background-color: red;
align-items: center;
width: 270px;
padding: 13px;
border-radius: 12px;
`;

const ErrorTitle = styled.Text`
font-size: 22px;
color: white;
`;

const BgAniWapper = styled.View`
width: 100%;
position: absolute;
height: 100%;
`;



export const LoginScreen = ({ navigation }) => {
  const [email, setEmail] = useState("")
  const [showPassword, setShowPassword] = useState(false)
  const [inputError, setInputError] = useState(null)
  const [password, setPassword] = useState(null)
  const [loading, setLoading] = useState(false)

  const { dispatch } = useAuthStates()


  const loginUser = async () => {
    setInputError(null)
    let data = []
    setLoading(true)
    try{
     const res = await signInWithEmailAndPassword(auth, email, password)
     if(res.user) {
      const docRef = doc(db, "users", res.user.uid);
      const docSnap = await getDoc(docRef);
   
      if (docSnap.exists()) {
       data = [res.user, docSnap.data()]
       console.log("Document data:", data)
       const jsonValue = JSON.stringify(data)
       await AsyncStorage.setItem("@userdata", jsonValue)
       dispatch({ type: 'LOGIN', payload: data})
       setLoading(false)
     } else {
       console.log("Document is not found");
       setLoading(false)
     
      } 
    }
  }   
    catch(error) {
      setLoading(false)
     console.log(error.message)
     console.log(error)
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

  const handleLogin = () => {
      const emailStr = '@';
      
    setInputError(null)
    if(!email || !password) {  
      Alert.alert(
        "Error",
        "All Input Must Be Filled",
        [{ text: "Okay", onPress: () => setLoading(false) }],
        {
          cancelable: true,
        }
      );
      return
  }
    if(email.includes(emailStr)) {
      loginUser()
    }else {
      Alert.alert(
        "Error",
        "Invalid email",
        [{ text: "Okay", onPress: () => setLoading(false) }],
        {
          cancelable: true,
        }
      )
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
    <LoginContainer>
    <Title>Login Now</Title>
      <Input
      label="Email"
        textContentType="emailAddress"
        activeOutlineColor="black"
        theme={{ colors: { primary: '#52ab98'}}}
        keyboardType="email-address"
         autoCapitalize="none"
      onChangeText={(text) => setEmail(text)}
      right={<TextInput.Icon icon="email" />}
    />
    {!showPassword && <Input
      label="Password"
      value={password}
      theme={{ colors: { primary: '#52ab98'}}}
         textContentType="password"
            autoCapitalize="none"
       secureTextEntry
      onChangeText={(text) => setPassword(text)}
      right={!showPassword ? <TextInput.Icon onPress={() => setShowPassword(!showPassword)} icon="eye" /> :<TextInput.Icon onPress={() => setShowPassword(!showPassword)} icon="eye-remove" /> }
    /> }
     {showPassword && <Input
      label="Password"
        textContentType="password"
        theme={{ colors: { primary: '#52ab98'}}}
            autoCapitalize="none"
      value={password}
      onChangeText={(text) => setPassword(text)}
      right={!showPassword ? <TextInput.Icon onPress={() => setShowPassword(!showPassword)} icon="eye" /> :<TextInput.Icon onPress={() => setShowPassword(!showPassword)} icon="eye-remove" /> }
    /> }

    <ButtonWrapper>
  {!loading &&  <ButtonStyled icon="lock" mode="contained" onPress={() => handleLogin()}> Login
  </ButtonStyled> }
  {loading &&  <ButtonStyled icon="lock" mode="contained"> Login
  </ButtonStyled> }

  </ButtonWrapper>
    </LoginContainer>
    </LoginBackground>
    </Provider>
  );
}