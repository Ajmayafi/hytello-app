import React from "react";
import { Button } from "react-native-paper";
import styled from "styled-components/native";
import LottieView from "lottie-react-native";

const AnimationBackground = styled.View`
width: 100%;
height: 100%
margin: auto;
justify-content: center;
`;

const AnimationWrapper = styled.View`
width: 100%;
height: 40%;
`;

const DetailsWrapper = styled.View`
align-items: center;
margin-top: 13px;
`;

const Title = styled.Text`
font-size: 23px;
width: 95%;
text-align: center;
`;

const ButtonCompo = styled(Button).attrs({
  fontSize: 27
})`
width: 230px;
padding: 13px;
background-color: ${(props) => props.theme.colors.ui.color};
margin-top: 60px;
`;


export const TopUpSuccessScreen = ({ route, navigation }) => {
   const { amount, type, name, number } = route.params;

  return (
      <AnimationBackground>
     {type && type === "airtime" && (
       <>
      <AnimationWrapper>
       <LottieView
          key="animation"
          autoPlay
          loop
          resizeMode="cover"
          source={require("../../../animations/sucess.json")}
        />
      </AnimationWrapper>
      <DetailsWrapper>
     <Title>Your recharge of ₦{amount} to {number} is succesfull</Title>
       <ButtonCompo mode="contained" onPress={() => navigation.navigate("Dashboard")}>Dashboard</ButtonCompo>
      </DetailsWrapper>
      </>
      )}
       {type && type === "transfer" && (
       <>
      <AnimationWrapper>
       <LottieView
          key="animation"
          autoPlay
          loop
          resizeMode="cover"
          source={require("../../../animations/sucess.json")}
        />
      </AnimationWrapper>

      <DetailsWrapper>
     <Title>You have succesfully sent ₦{amount} to {name}</Title>
       <ButtonCompo mode="contained" onPress={() => navigation.navigate("Dashboard")}>Dashboard</ButtonCompo>
      </DetailsWrapper>
      </>
      )}
      </AnimationBackground>
  )
}