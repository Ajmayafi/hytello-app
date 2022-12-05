import React, { useState, useEffect, useContext } from "react";
import { ScrollView } from "react-native";
import { AuthContext } from "../../../services/authentication/auth.context";
import { useAuthStates } from "../../../hooks/useAuthStates";
import { Button, ActivityIndicator } from "react-native-paper";
import styled from "styled-components/native";



export const ViewTransactionScreen = ({ route }) => {
   const { details } = route.params;

   const { darkMode } = useAuthStates()

   const [loading, setLoading] = useState(false)

   const TransactionBackground = styled.View`
margin-top: 30px;
`;

const DetailsContainer = styled.View`
text-align: left;
margin-left: 12px;
`;

const DetailsCard = styled.View`
padding: 12px;
border-bottom: 3px black;
`;

const Title = styled.Text`
font-size: 22px;
text-align: center;
padding: 12px;
color: ${darkMode ? "white" : "black"};
`;

const Label = styled.Text`
font-size: 20px;
text-align: left;
font-family: ${(props) => props.theme.fonts.heading};
font-weight: bold;
color: ${darkMode ? "white" : "black"};
`;

const Paragraph = styled.Text`
font-size: 22px;
font-family: ${(props) => props.theme.fonts.title};
text-align: left;
color: ${darkMode ? "white" : "black"};
`;

const ReportButton = styled(Button).attrs({
  fontSize: 27,
})`
width: 270px;
padding: 13px;
color: white;
background-color: ${darkMode ? "teal" : 'black'};
color: 'white';
margin: auto;
margin-top: 60px;
margin-bottom: 30px
`;

const LoadingContainer = styled.View`
margin: auto;
`;

   useEffect(() => {
      
   }, [])

  return (
     <ScrollView contentContainerStyle={{ flex: 1, backgroundColor: darkMode ? "#1A1A1A" :  "white"}}>
     <TransactionBackground>
      {loading && <ActivityIndicator animating={true} color="#52ab98" size={32} />}

          <DetailsContainer>
       <DetailsCard>
        <Label>Amount:</Label>
       <Paragraph>₦{details.amount}</Paragraph>
       </DetailsCard>
        <DetailsCard>
        <Label>Date:</Label>
       <Paragraph>{details.realDate}</Paragraph>
       </DetailsCard>
          <DetailsCard>
        <Label>Narration:</Label>
       <Paragraph>{details.narration}</Paragraph>
       </DetailsCard>
        <DetailsCard>
        <Label>Reference</Label>
       <Paragraph>{details.referenceNumber}</Paragraph>
       </DetailsCard>
      {details.senderBank && <DetailsCard>
        <Label>Sender:</Label>
       <Paragraph>{details.senderBank}</Paragraph>
       </DetailsCard> }
       {details.recipientBank && <DetailsCard>
        <Label>Sent from:</Label>
       <Paragraph>{details.recipientBank}</Paragraph>
       </DetailsCard> }
     
      </DetailsContainer>
 
     
      {details && <ReportButton mode="contained">Report Transaction!</ReportButton>}
     </TransactionBackground>
     </ScrollView>
  )
}