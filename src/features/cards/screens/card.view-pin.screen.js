import React, { useState, useEffect } from "react";
import { View, Text, TouchableOpacity, Button } from "react-native";
import { PinViewComponent } from "./pin component";
import { TextInput, Button as PaperButton } from "react-native-paper";
import styled from "styled-components/native";
import VgsShowAttribute from "vgs-show-react-native";

const Info = styled.Text`
padding: 15px;
font-size: 20px;
font-family: ${(props) => props.theme.fonts.title};
`;

const PinInput = styled(TextInput)`
width: 96%;
margin: auto;
margin-bottom: 10px;
`;

const Label = styled.Text`
font-size: 16px;
padding-left: 10px;
`;

const PinViewer = styled.View`
width: 120px;
background-color: gray;
padding: 7px;
margin: auto;
border-radius: 7px;
`;

const PinText = styled.Text`
font-size: 29px;
text-align: center;
font-family: ${(props) => props.theme.fonts.heading};
`;


export const ViewCardPinScreen = ({ route }) => {
     const [isShown, setIsShown] = useState(false);
     const [cardToken, setCardToken] = useState(null)

     const { cardid } = route.params;


     useEffect(() => {
        const options = {
            method: 'GET',
            headers: {
              accept: 'application/json',
              Authorization: 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MzE1NDNjOWI0YjMxZjg5ZTdkYTUwMTEiLCJlbWFpbEFkZHJlc3MiOiJhamFtaWVlbHVAZ21haWwuY29tIiwianRpIjoiNjM0MDRiYTNiNjgxMWY0ZGQ4NWJmN2M0IiwibWVtYmVyc2hpcCI6eyJfaWQiOiI2MzE1NDNjOWI0YjMxZjg5ZTdkYTUwMTQiLCJidXNpbmVzcyI6eyJfaWQiOiI2MzE1NDNjOWI0YjMxZjg5ZTdkYTUwMGYiLCJuYW1lIjoiSHl0ZWxsbyBOaWdlcmlhIEx0ZCIsImlzQXBwcm92ZWQiOnRydWV9LCJ1c2VyIjoiNjMxNTQzYzliNGIzMWY4OWU3ZGE1MDExIiwicm9sZSI6IkFQSUtleSJ9LCJpYXQiOjE2NjUxNTgwNTEsImV4cCI6MTY2NTc2Mjg1MX0.8vbVJA2gAfWe3Z73mB2U4TLUNN_dCHKlE29lR0OOpHw'
            }
          };
          
          fetch('https://api.sandbox.sudo.cards/cards/63423cb63633b84267e2e9a4/token', options)
            .then(response => response.json())
            .then(response => {
                setCardToken(response.data.token)
                console.log("card token here:  " + cardToken)
                console.log("card id here:  " + cardid)
            })
            .catch(err => console.error(err));
     }, [])


     if(!cardToken) {
        return null
     }

    return (
        // <View>
        //     <Info>The four numbers below are your virtual card PIN, please keep it safe. </Info>
        //     <Info>Use your card PIN for online transactions.</Info>
        //     <TouchableOpacity onPress={() => setIsShown(!isShown)}>
        //    <PinViewer>
        //    {isShown && <PinText>3344</PinText> }
        //    {!isShown && <PinText>****</PinText> }
        //    </PinViewer>
        //    </TouchableOpacity>
          <PinViewComponent cardToken={cardToken} cardid={cardid} /> 
   

    )
}