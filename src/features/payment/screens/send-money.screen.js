import React, { useState, useContext, useEffect } from "react";
import styled from "styled-components/native";
import { Alert } from "react-native";
import { AuthContext } from "../../../services/authentication/auth.context";
import { TextInput, Button, ActivityIndicator  } from 'react-native-paper';
import CurrencyInput from 'react-native-currency-input';
import RNPickerSelect from 'react-native-picker-select';





export const SendScreen = ({ navigation }) => {
  const [email, setEmail] = useState("");
  const [amount, setAmount] = useState(null);
  const [narration, setNarration] = useState("");
  const [accountNumber, setAccountNumber] = useState(null)
  const [error, setError] = useState("");
  const [inputError, setInputError] = useState("");
  const [loading, setLoading] = useState(false);
   const [bank, setBank] = useState(null);
   const [banks, setBanks] = useState(null)

  const { user, accountDetails, darkMode } = useContext(AuthContext)

  const SendContainer = styled.View`
 align-items: center;
 padding-top: 30px;
 flex: 1;
 background-color: ${darkMode ? "#1A1A1A" : "white"};
`;

const Input = styled(TextInput)`
width: 300px;
margin-bottom: 25px;
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
text-align: center;
font-size: 26px;
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

const DropS = styled.View`
width: 300px;
max-width: 300px;
background-color: #E4E4E4;
align-items: center;
justify-content: center;
text-align: center;
font-size: 60px;
margin-bottom: 25px;
height: 65px;
`;


 
  const handleSendMoney = async () => {
     if(!amount || !bank || !narration) {
      Alert.alert(
        "Error",
        "All fields are required",
        [{ text: "Okay", onPress: () => null}],
        {
          cancelable: true,
        }
      )

      return
     }

     if(Number(amount) < 100) {
      Alert.alert(
        "Error",
        "Minimum transfer is N100",
        [{ text: "Okay", onPress: () => setLoading(false) }],
        {
          cancelable: true,
        }
      )
      return
     }

     if(Number(amount) > accountDetails.availableBalance) {
      Alert.alert(
        "Error",
        "Your balance is too low, please recharge your account",
        [{ text: "Okay", onPress: () => setLoading(false) }],
        {
          cancelable: true,
        }
      )

      return
     }


      setLoading(true)
      try {
        const enqReq = await fetch('https://api.hytello.com.ng/name-enquiry', {
            headers: {
                'Content-Type': 'application/json',
               },
            method: 'post',
            body: JSON.stringify({
                ref: user.kuda_ref,
                bankCode: bank,
                accountNumber: accountNumber
            })
        })

        const enqData = await enqReq.json()

        if(enqReq.status === 200) {
              setLoading(false)
             navigation.navigate("Confirm", {
              type: 'transfer',
              data: {
                ...enqData,
                amount: `${amount / 100 * 100}`,
                narration: narration
              }
             })
        }else {
          setLoading(false)
          Alert.alert(
            "Error",
            "Invalid details",
            [{ text: "Okay", onPress: () => setLoading(false) }],
            {
              cancelable: true,
            }
          )
        }

      } catch(error) {
         console.log(error)
         setLoading(false)
      }
  }

 
  useEffect(() => {
    async function fetchBanks() {
        
    var token
    try {
        const tokenReq = await fetch("https://kuda-openapi-uat.kudabank.com/v2/Account/GetToken", {
            method: 'post',
            headers: {
              accept: 'application/json',
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              email: "ajamilkt@gmail.com",
              apiKey: "MlWje7YUASZf1VoH6E3m"
            })
          })
        
          const tokenData = await tokenReq.json()
          token = tokenData        

    fetch('https://kuda-openapi-uat.kudabank.com/v2.1', {
        headers: {
            'Content-Type': 'application/json',
             Authorization: `bearer ${token}`,
           },
        method: 'post',
        body: JSON.stringify({
            serviceType: "BANK_LIST",
            requestRef: '7010774'
        })
    })
    .then(res => res.json())
    .then(data => {
        if(data.message === "Completed Successfully") {
           const bData = data.data.banks
           let result = []
    bData.forEach((b) => {
      result.push({label: b.bankName, value: b.bankCode})
    })
    setBanks(result)
        }else {
            console.log("Something went wrong")
        }
    })
    .catch((error) => {
        console.log(error)
    })

   }catch(error) {
     console.log(error)
   }
    }

    fetchBanks()
  }, [])

  return (
    <SendContainer>
    {inputError ? <ErrorContainer>
   <ErrorText>Error:<ErrorTitle>{inputError}</ErrorTitle></ErrorText>
    </ErrorContainer> : null }
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
      theme={{ colors: { primary: '#52ab98'}}}
      placeholder="Amount"
      accessibilityLabel="Amount"
      fontSize={18}
      minValue={0}
      delimiter=","
      separator="."
      precision={2}
      onChangeText={(formattedValue) => {
        console.log(formattedValue)
      }}
    />
    </AmountS>
    <Input
      keyboardType="decimal-pad"
      theme={{ colors: { primary: '#52ab98'}}}
      onChangeText={(text) => setAccountNumber(text)}
       textContentType="telephoneNum"
         autoCapitalize="none"
      label="Account Number"
      value={accountNumber}
      multiline={false}
      maxLength={10}
    /> 
    <DropS>
     <RNPickerSelect
             placeholder={{label: "Select Bank"}}
            onValueChange={(value) => {
              setBank(value)
            }}
            items={banks ? banks : []}
        />
    </DropS>

      <Input
        keyboardType="default"
        theme={{ colors: { primary: '#52ab98'}}}
         onChangeText={(text) => setNarration(text)}
        textContentType="text"
      label="Narration"
      value={narration}
    />
    {!loading && <Buton onPress={() => handleSendMoney()} mode="contained">Send Money</Buton> }
    {loading && <ActivityIndicator animating={true} color="purple" /> }
    </SendContainer>
  )
}
