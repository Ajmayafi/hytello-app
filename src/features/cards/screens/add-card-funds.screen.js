import React, { useState, useEffect } from 'react';
import styled from 'styled-components/native';
import { Alert } from "react-native";
import { TextInput, Button } from 'react-native-paper';
import CurrencyInput from 'react-native-currency-input';
import RNPickerSelect from 'react-native-picker-select';
import { useAuthStates } from '../../../hooks/useAuthStates';

import { ErrorComponent } from "../../../components/error.component";

const AddMoneyContainer = styled.View`
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
background-color: ${(props) => props.theme.colors.ui.color};
padding: 12px;
font-size: 26px;
`;

const Title = styled.Text`
text-align: center;
font-size: 22px;
padding: 12px;
`;

const AmountS = styled.View`
width: 300px;
max-width: 300px;
background-color: #E4E4E4;
padding: 14px;
margin-bottom: 15px;
`;


export const AddFundsToCardScreen = ({ navigation, route }) => {
  const [amount, setAmount] = React.useState(null);
  const [method, setMethod] = useState(null);
  const [inputError, setInputError] = useState(null)
  const [exchangeFee, setExchangeFee] = useState(null)
  const { user, accountDetails } = useAuthStates()

  const { cardId } = route.params;

  const handleFundCard = () => {
     if(!amount) {
      Alert.alert(
        "Error",
        'Please enter amount',
        [{ text: "Okay", onPress: () => null }],
        {
          cancelable: true,
        }
      )

      return console.log("no amount")
     }

     if(Number(exchangeFee) > Number(accountDetails.availableBalance)) {
      Alert.alert(
        "Error",
        'Your balance is too low, please top up your account',
        [{ text: "Okay", onPress: () => null }],
        {
          cancelable: true,
        }
      )
      return console.log("top up is required")
     }

     if(Number(amount) < 5) {
      Alert.alert(
        "Error",
        'Minimum top up is $5',
        [{ text: "Okay", onPress: () => null }],
        {
          cancelable: true,
        }
      )
       return console.log("minimum is $5")
     }

     navigation.navigate("Confirm", {
      type: "card funding",
      data: {
        amount,
        exchangeFee,
        cardId
      }
     })
  
  }

  useEffect(() => {
     const newFee = 784 * Number(amount)
     setExchangeFee(newFee)
  }, [amount])


  return (
    <AddMoneyContainer>
    <Title>Current currency exchange N784/USD</Title>
    <Title>Paying fee N{exchangeFee ? exchangeFee.toFixed(2): ""}</Title>
    {inputError && <ErrorComponent inputError={inputError} /> }
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

      <Buton mode="contained" onPress={() => handleFundCard()}>Add Money</Buton>
    </AddMoneyContainer>
  );
};
