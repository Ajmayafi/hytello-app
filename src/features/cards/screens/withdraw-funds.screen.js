import React, { useState, useEffect } from "react";
import styled from "styled-components/native";
import { TextInput, Button, ActivityIndicator, Divider  } from 'react-native-paper';
import CurrencyInput from 'react-native-currency-input';
import { Alert } from "react-native";

const WContainer = styled.View`
 align-items: center;
 margin-top: 30px;
`;

const Input = styled(TextInput)`
width: 300px;
margin-bottom: 25px;
`;

const Buton = styled(Button).attrs({
 
})`
width: 270px;
font-size: 25px;
background: ${(props) => props.theme.colors.ui.color}
padding: 12px;
font-size: 26px;
`;

const Title = styled.Text`
text-align: center;
font-size: 17px;
padding: 12px;
`;

const ErrorContainer = styled.View`
align-items: center;
width: 85%;
padding: 4px;
margin-top: 6px;
`;

const ErrorTitle = styled.Text`
color: red;
font-size: 18px;
`;

const ErrorText = styled.Text`
color: black;
font-size: 18px;
`;

const AmountS = styled.View`
width: 300px;
max-width: 300px;
background-color: #E4E4E4;
padding: 14px;
margin-bottom: 15px;
`;





export const WithdrawFundScreen = ({ navigation, route }) => {
  const [amount, setAmount] = useState(null)
  const [gettingFee, setGettingFee] = useState(null)
  const [exchangeRate, setExchangeRate] = useState(710)

  const { cardBalance, cardId } = route.params;
  
  const handleWithdraw = () => {
    if(!amount) {
      Alert.alert(
        "Error",
        "Please enter amount",
        [{ text: "Okay", onPress: () => null }],
        {
          cancelable: true,
        }
      )
      return 
    }
    if(Number(amount) > cardBalance) {
    Alert.alert(
      "Error",
      "You card balance is not upto the amount you are withdrawing",
      [{ text: "Okay", onPress: () => null }],
      {
        cancelable: true,
      }
    )
    return 
    }

    if(Number(amount) < 5 ) {
      Alert.alert(
        "Error",
        "Minimum withdraw is 5 dollars",
        [{ text: "Okay", onPress: () => null }],
        {
          cancelable: true,
        }
      )

      return
    }

    navigation.navigate("Confirm", {
      type: "withdraw from card",
      data: {
        gettingFee,
        amount,
        cardId
      }
    })

  }

  useEffect(() => {
    const newFee = exchangeRate * Number(amount)
    setGettingFee(newFee)
 }, [amount])



  return (
    <WContainer>
      <Title>Withdraw Rate: {exchangeRate}/USD</Title>
      <Title>Getting fee: N{gettingFee ? gettingFee.toFixed(2) : 0.00}</Title>
      <AmountS style={{
        borderBottomColor: '#808080',
        borderBottomWidth: 1,
        marginBottom: 30,
      }}>
         <CurrencyInput
      value={amount}
      onChangeValue={setAmount}
      label={"Number"}
      prefix="$"
      placeholder="Amount"
      accessibilityLabel="Amount"
      theme={{ colors: { primary: '#52ab98'}}}
      fontSize={18}
      minValue={0}
      delimiter=","
      separator="."
      precision={2}
      onChangeText={(formattedValue) => {
    
      }}
    />
    </AmountS>
   <Buton mode="contained" onPress={() => handleWithdraw()}>Withdraw</Buton>
    </WContainer>
  )
}


