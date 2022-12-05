import React, { useState, useContext } from 'react';
import { View } from "react-native";
import styled from 'styled-components/native';
import { TextInput, Button } from 'react-native-paper';
import { AuthContext } from '../../../services/authentication/auth.context';


export const AddMoneyScreen = ({ navigation }) => {
  const { accountDetails, darkMode } = useContext(AuthContext)

  
const AddMoneyContainer = styled.View`
padding-top: 30px;
background-color: ${darkMode ? "#1A1A1A" : "white"};
flex: 1;
`;

const Input = styled(TextInput)`
width: 300px;
margin-bottom: 25px;
`;

const Info = styled.Text`
padding: 15px;
font-family: ${(props) => props.theme.fonts.title};
font-size: 19px;
color: ${darkMode ? "white" : "black"};
`;

const Buton = styled(Button).attrs({
 
})`
width: 270px;
font-size: 25px;
background-color: ${(props) => props.theme.colors.ui.color}
padding: 12px;
font-size: 26px;
`;

const Title = styled.Text`
t ext-align: center;
font-size: 26px;
padding: 12px;
`;

const AmountS = styled.View`
width: 300px;
max-width: 300px;
background-color: #E4E4E4;
padding: 14px;
margin-bottom: 15px;
`;

const Label = styled.Text`
font-size: 20px;
text-align: left;
font-family: ${(props) => props.theme.fonts.heading};
color: ${darkMode ? "white" : "black"};
font-weight: bold;
`;

const Paragraph = styled.Text`
font-size: 22px;
font-family: ${(props) => props.theme.fonts.title};
text-align: left;
color: ${darkMode ? "white" : "black"};
`;

const DetailsContainer = styled.View`
text-align: left;
margin-left: 12px;
`;

const DetailsCard = styled.View`
padding: 12px;
border-bottom: 3px black;
`;

 
  return (
    <AddMoneyContainer>
      <Info>You can easily make a transfer to this account and get your funds deposited instantly</Info>
          <DetailsContainer>
       <DetailsCard>
       <Label>Name</Label>
       <Paragraph>{accountDetails.accountName}</Paragraph>
       </DetailsCard>
       <DetailsCard>
        <Label>Account Number</Label>
       <Paragraph>{accountDetails.accountNumber}</Paragraph>
       </DetailsCard>
        <DetailsCard>
        <Label>Bank Name</Label>
       <Paragraph>Kuda Bank</Paragraph>
       </DetailsCard>
      </DetailsContainer>
    </AddMoneyContainer>
  )
}
