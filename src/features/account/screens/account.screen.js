import React from "react";
import styled from "styled-components/native";
import { Button } from "react-native-paper";
import LottieView from "lottie-react-native";
import TypeWriter from 'react-native-typewriter'

const HomeBackground = styled.ImageBackground.attrs({
  source: require("../../../images/bg.jpg"),
})`
width: 100%;
height: 100%;
`;

const AnimationWapper = styled.View`
width: 100%;
position: absolute;
height: 30%;
top: 10%;
`;

const BgAniWapper = styled.View`
width: 100%;
position: absolute;
height: 100%;
`;


const HomeContainer = styled.View`
align-items: center;
justify-content: center;
margin: auto;
`;

const Title = styled.Text`
font-size: 34px;
color: white;
text-align: center;
`;

const ButtonStyled = styled(Button)`
width: 160px;
padding: 12px;
font-size: 25px;
background-color: ${(props) => props.theme.colors.ui.color};
margin-bottom: 13px;
`;

const ButtonWrapper = styled.View`
 padding-top: 40px;
`;


export const AccountScreen  = ({ navigation }) => {

  let delayMap = [
    // increase delay by 100ms at index 4
    { at: 4, delay: 100 },
    // increase delay by 400ms following every '.' character
    { at: '.', delay: 400 },
    // decrease delay by 200ms following every '!' character
    { at: /!/, delay: -200 }
  ]

  return (
      <HomeBackground>
           <BgAniWapper>
         <LottieView
          key="animation"
          autoPlay
          loop
          resizeMode="cover"
          source={require("../animations/background.json")}
        />
      </BgAniWapper>
  
    <HomeContainer>
    <ButtonWrapper>
     <ButtonStyled icon="lock" mode="contained" onPress={() => navigation.navigate("Login")}> Login 
  </ButtonStyled>
    <ButtonStyled icon="email" mode="contained" onPress={() => navigation.navigate("Register")}> Register
  </ButtonStyled>
  
  </ButtonWrapper>
    </HomeContainer>
    </HomeBackground>
  )
}