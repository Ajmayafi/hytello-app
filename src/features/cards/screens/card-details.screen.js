import React, { useState, useEffect, useContext } from "react";
import { ScrollView, Alert } from "react-native";
import { AuthContext } from "../../../services/authentication/auth.context";
import { Button, ActivityIndicator } from "react-native-paper";
import styled from "styled-components/native";

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
`;

const Label = styled.Text`
font-size: 20px;
text-align: left;
font-family: ${(props) => props.theme.fonts.heading};
font-weight: bold;
`;

const Paragraph = styled.Text`
font-size: 22px;
font-family: ${(props) => props.theme.fonts.title};
text-align: left;
`;

const FreezeButton = styled(Button).attrs({
  fontSize: 27,
})`
width: 270px;
padding: 13px;
background-color: black;
color: 'white';
margin: auto;
margin-top: 60px;
margin-bottom: 30px
`;

const LoadingContainer = styled.View`
margin: auto;
`;

export const CardDetailsScreen = ({ route, navigation }) => {
  const [loading, setLoading] = useState(false)
   const { details } = route.params;
  
   const url = details.is_active === true ? "https://api.hytello.com.ng/freeze-card" : "https://api.hytello.com.ng/unfreeze-card"

   const handleFreeze = async () => {
    setLoading(true)
    try {
      const actionReq = await fetch(url, {
        method: 'post',
        headers: {
            'Content-Type': 'application/json',
           },
       body: JSON.stringify({
          cardId: details.card_id
       })
    })
 
    const actData = await actionReq.json()
 
    if(actionReq.status === 200) {
      setLoading(false)
      Alert.alert(
        "Success",
        `${actData}`,
        [{ text: "Okay", onPress: () => null}],
        {
          cancelable: true,
        }
      )
    }else {
      setLoading(false)
      Alert.alert(
        "Error",
        `${actData}`,
        [{ text: "Okay", onPress: () =>  null }],
        {
          cancelable: true,
        }
      )
    }
 
     }catch(error) {
       setLoading(false)
      console.log(error)
      console.log("failed")
   }
  }

  useEffect(() => {
   console.log(details.card_id)
  }, [])


  return (
     <ScrollView>
     <TransactionBackground>
          <DetailsContainer>
       <DetailsCard>
        <Label>Name:</Label>
       <Paragraph>{details.card_name}</Paragraph>
       </DetailsCard>
        <DetailsCard>
        <Label>Card Number:</Label>
       <Paragraph>{details.card_number}</Paragraph>
       </DetailsCard>
          <DetailsCard>
        <Label>Card Expiry:</Label>
       <Paragraph>{details.expiry_month}/{details.expiry_year}</Paragraph>
       </DetailsCard>
        <DetailsCard>
        <Label>CVV</Label>
       <Paragraph>{details.cvv}</Paragraph>
       </DetailsCard>
       <DetailsCard>
        <Label>Brand</Label>
       <Paragraph>{details.brand}</Paragraph>
       </DetailsCard>
       <DetailsCard>
        <Label>Billing Address</Label>
       <Paragraph>{details.billing_address.billing_address1}</Paragraph>
       </DetailsCard>
       <DetailsCard>
        <Label>Billing City</Label>
       <Paragraph>{details.billing_address.billing_city}</Paragraph>
       </DetailsCard>
       <DetailsCard>
        <Label>Billing Country</Label>
       <Paragraph>{details.billing_address.billing_country}</Paragraph>
       </DetailsCard>
       <DetailsCard>
        <Label>Billing Zipcode</Label>
       <Paragraph>{details.billing_address.billing_zip_code}</Paragraph>
       </DetailsCard>

      {!loading && <FreezeButton color="white" onPress={() => handleFreeze()}>{details.is_active ? "Freeze": "Unfreeze"}</FreezeButton> }
      {loading && <ActivityIndicator color="teal" size={43} style={{ margin: 20}} />}
      </DetailsContainer>
     </TransactionBackground>
     </ScrollView>
  )
}