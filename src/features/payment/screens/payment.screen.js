import React from "react";
import { TouchableOpacity } from "react-native";
import { Button, ActivityIndicator, List } from "react-native-paper";
import styled from "styled-components/native";
import LottieView from "lottie-react-native";
import { Ionicons } from "@expo/vector-icons";
import { useAuthStates } from "../../../hooks/useAuthStates";




export const PaymentScreen = ({ navigation }) => {
    const { darkMode } = useAuthStates()
    
const NotFoundBackground = styled.View`
flex: 1;
background-color: ${darkMode ? "#1A1A1A" : "white"};
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

    return (
       <NotFoundBackground>
       <TouchableOpacity onPress={() => navigation.navigate("Buy Airtime")}>
        <List.Item
    title="Buy Airtime"
    description="Easily top up your sim"
    titleStyle={{ color: darkMode ? "white" : "black"}}
    descriptionStyle={{ color: darkMode ? "gainsboro": "gray"}}
    left={props => <Ionicons {...props} name="phone-portrait" color={darkMode ? "white" : "black" }  size={30} />}
  />
  </TouchableOpacity>
  <TouchableOpacity onPress={() => navigation.navigate("AddMoney")}>
        <List.Item
    title="Add Money"
    description="Easily recharge up your account"
    titleStyle={{ color: darkMode ? "white" : "black"}}
    descriptionStyle={{ color: darkMode ? "gainsboro": "gray"}}
    left={props => <Ionicons {...props} name="arrow-up-sharp" color={darkMode ? "white" : "black" }    size={30} />}
  />
  </TouchableOpacity>
  <TouchableOpacity  onPress={() => navigation.navigate("SendMoney")}>
   <List.Item
    title="Send Money"
    description="Make payments accross banks"
    titleStyle={{ color: darkMode ? "white" : "black"}}
    descriptionStyle={{ color: darkMode ? "gainsboro": "gray"}}
    left={props => <Ionicons {...props} name="arrow-forward-sharp" color={darkMode ? "white" : "black" } size={30} />}
  />
  </TouchableOpacity>
  <TouchableOpacity>
   <List.Item
    title="Buy Data"
    description="Stay connected to the world"
    titleStyle={{ color: darkMode ? "white" : "black"}}
    descriptionStyle={{ color: darkMode ? "gainsboro": "gray"}}
    left={props => <Ionicons {...props} name="earth" color={darkMode ? "white" : "black" }   size={30} />}
  />
  </TouchableOpacity>
       </NotFoundBackground>
    )
}
