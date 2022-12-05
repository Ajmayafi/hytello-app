import React, { useContext, useState } from "react";
import { AuthContext } from "../../../services/authentication/auth.context";
import { useFetchCards } from "../../../hooks/useFetchCards";
import { useAuthStates } from "../../../hooks/useAuthStates";
import {  ActivityIndicator } from "react-native-paper";
import styled from "styled-components/native";
import LottieView from "lottie-react-native";
import { TransactionContext } from "../../../services/transactions/transactions.context";


export const OverviewScreen = ({ navigation }) => {
   const { darkMode } = useAuthStates()
   const { transactions } = useContext(TransactionContext)

   const NotFoundBackground = styled.View`
flex: 1;
align-items: center;
background-color: ${darkMode ? "#1A1A1A" : "white"};
`;

const AnimationWrapper = styled.View`
width: 100%;
height: 60%
`;

const Title = styled.Text`
font-size: 33px;
padding: 10px;
font-family: ${(props) => props.theme.fonts.title};
color: ${darkMode ? "white" : "black" }  
`;

const InfoContainer = styled.View`
justify-content: center;
align-items: center;
`;


  return (
    <NotFoundBackground>
   <AnimationWrapper>    
    <LottieView
     key="animation"
     autoPlay
     loop
     resizeMode="cover"
     source={require("../../../animations/analytics.json")}
   />
   </AnimationWrapper>
   <InfoContainer>
      <Title>Total money in: N{transactions ? transactions.totalDebit : '0.00'}</Title> 
      <Title>Total money out: N{transactions ? transactions.totalCredit : '0.00'}</Title> 
   </InfoContainer>
  </NotFoundBackground>
  )
}


