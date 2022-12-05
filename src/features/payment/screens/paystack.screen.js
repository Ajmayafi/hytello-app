import React, { useContext } from "react";
import styled from "styled-components/native";
import { AuthContext } from "../../../services/authentication/auth.context";
import  { Paystack }  from 'react-native-paystack-webview';


const PaystackContainer = styled.View`
flex: 1;
`; 

export const PaystackScreen = ({ route, navigation }) => {
  const  { user } = useContext(AuthContext);
  const { amount } = route.params;

  const addMoneyToUser = async () => {
      try {
      const res = await fetch('https://twirfyfinance.herokuapp.com/addmoney', {
        method: 'post',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({
         email: user.email,
         method: 'Paystack',
         amount: amount
          
        })
       })

       if(res.status === 200) {
       navigation.navigate("TopUpSuccess", {
         amount: amount,
         type: "Deposit"
       })
       }

     } catch(err) {
         console.log(err)
         /// CONSOLE LOGIN ERROOR
     }
  }

  return (
      <PaystackContainer>
      <Paystack  
        paystackKey="pk_test_8276735228cd4de6604deba10614a23af868fd43"
        amount={amount}
        billingEmail={user.email}
        activityIndicatorColor="purple"
        onCancel={(e) => {
          // handle response here
          navigation.navigate("Dashboard")
        }}
        onSuccess={(res) => {
          // handle response here
          addMoneyToUser()
        }}
        autoStart={true}
      />
    </PaystackContainer>
  )
}