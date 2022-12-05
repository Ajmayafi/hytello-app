import React, { useContext, useState } from "react";
import { AuthContext } from "../../../services/authentication/auth.context";
import { useFetchCards } from "../../../hooks/useFetchCards";
import { Button, ActivityIndicator } from "react-native-paper";
import styled from "styled-components/native";
import LottieView from "lottie-react-native";
import { useNavigation } from "@react-navigation/native";

const NotFoundBackground = styled.View`
width: 100%;
height: 100%;
background-color: white;
align-items: center;
`;

const AnimationWrapper = styled.View`
width: 100%;
height: 60%
`;

const Title = styled.Text`
font-size: 23px;
padding: 10px;
font-family: ${(props) => props.theme.fonts.title};
`;

const InfoContainer = styled.View`
justify-content: center;
align-items: center;
`;

const Buton = styled(Button).attrs({
 
})`
width: 270px;
font-size: 25px;
background: ${(props) => props.theme.colors.ui.color}
padding: 12px;
margin-top: 10px;
font-size: 26px;
`;




export const NoCardFoundScreen = () => {
    const { user } = useContext(AuthContext)
    const navigation = useNavigation()
  
    return (
       <NotFoundBackground>
        <AnimationWrapper>    
         <LottieView
          key="animation"
          autoPlay
          loop
          resizeMode="cover"
          source={require("../../../animations/no-card.json")}
        />
        </AnimationWrapper>
        <InfoContainer>
            <Title>It seems you don't have a card yet! Click the button to create</Title>
        <Buton onPress={() => navigation.navigate("Create Card")} mode="contained">Create</Buton>
        </InfoContainer>
   
       </NotFoundBackground>
    )
}
