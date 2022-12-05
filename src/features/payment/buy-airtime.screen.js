import React, { useState, useContext } from "react";
import { StyleSheet } from "react-native-web";
import styled from "styled-components/native";
import { TextInput, Button, ActivityIndicator, Divider  } from 'react-native-paper';
import CurrencyInput from 'react-native-currency-input';
import RNPickerSelect from 'react-native-picker-select';
import { useAuthStates } from "../../hooks/useAuthStates";


export const BuyAirtimeScreen = ({ navigation }) => {
  const [amount, setAmount] = useState(null);
  const [operator, setOperator] = useState(null)
  const [number, setNumber] = useState(null)

  const { darkMode } = useAuthStates()

  const BuyAContainer = styled.View`
 align-items: center;
 padding-top: 30px;
 flex: 1;
 background-color: ${darkMode ? "#1A1A1A" : "white"};
`;

const Input = styled(TextInput).attrs({
  textColor: "green"
})`
width: 300px;
margin-bottom: 25px;
background-color: ${darkMode ? "#333333" : "white"};
`;

const Buton = styled(Button).attrs({
 
})`
width: 270px;
font-size: 25px;
background: ${(props) => props.theme.colors.ui.color}
padding: 12px;
font-size: 26px;
`;

const AmountS = styled.View`
width: 300px;
max-width: 300px;
background-color: #E4E4E4;
padding: 14px;
margin-bottom: 15px;
`;

const DropS = styled.View`
width: 300px;
max-width: 300px;
background-color: #E4E4E4;
margin-bottom: 25px;
`;
 
  const handleBuyAirtime = async () => {
     if(!amount || !operator || !number) {
      return
     }

     if(amount < 50) {
      return
     }

     const data = {
      amount,
      operator,
      number
     }

     navigation.navigate("Confirm", {
      type: 'airtime',
      data: data
     })

  }
  return (
    <BuyAContainer>
    <AmountS style={{
        borderBottomColor: '#808080',
        borderBottomWidth: 1,
        marginBottom: 30,
      }}>
         <CurrencyInput
      value={amount}
      onChangeValue={setAmount}
      label={"Number"}
      prefix="N"
      placeholder="Amount"
      accessibilityLabel="Amount"
      theme={{ colors: { primary: '#52ab98'}}}
      fontSize={18}
      delimiter=","
      minValue={0}
      separator="."
      precision={2}
      onChangeText={(formattedValue) => {

      }}
    />
    </AmountS>
      <Input
        keyboardType="decimal-pad"
        textContentType="tel"
        onChangeText={(text) => setNumber(text)}
      label="Number"
      value={number}
      textColor="green"
      multiline={false}
      maxLength={11}
      theme={{ colors: { primary: '#52ab98'}}}
    />
 
    <DropS>
     <RNPickerSelect
             placeholder={{label: "Select Operator"}}
            onValueChange={(value) => setOperator(value)}
            items={[
                { label: 'MTN', value: 'KD-VTU-MTNNG' },
                { label: 'Airtel', value: 'KD-VTU-ATNG' },
                { label: '9 Mobile', value: 'KD-VTU-9NG' },
                { label: 'Glo', value: 'KD-VTU-GLNG' },
            ]}
        />
    </DropS>
   <Buton mode="contained" onPress={() => handleBuyAirtime()}>Buy Airtime</Buton>
    </BuyAContainer>
  )
}


//