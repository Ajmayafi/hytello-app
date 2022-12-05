import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { View, ScrollView, Alert } from "react-native";
import { RadioButton, Button as PaperButton, Portal, Provider, Dialog, ProgressBar, TextInput  } from 'react-native-paper';
import { useAuthStates } from "../../../hooks/useAuthStates";
import RNPickerSelect from 'react-native-picker-select';
import CurrencyInput from 'react-native-currency-input';


const CardBackground = styled.View`
 
`;

const Info = styled.Text`
padding: 15px;
font-family: ${(props) => props.theme.fonts.title};
font-size: 19px;
`;

const Label = styled.Text`
font-size: 19px;
font-family: ${(props) => props.theme.fonts.heading};
`;

const CardType = styled.View`
margin: auto;
`;

const CardBrand = styled.View`

`;

const CardBrandLabel = styled.Text`
font-size: 17px;
font-family: ${(props) => props.theme.fonts.heading};
`;

const ButtonsWrapper = styled.View`
padding: 13px;
`;

const Button = styled(PaperButton)`
width: 200px;
padding: 10px;
background-color: ${(props) => props.theme.colors.ui.color}
margin: auto;
margin-top: 15px;
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

const AmountS = styled.View`
width: 300px;
max-width: 300px;
background-color: #E4E4E4;
padding: 14px;
margin-bottom: 15px;
`;

const FundingWrapper = styled.View`

`;


const Wrapper = styled.View`

`;

const FeeTitle = styled.Text`
font-size: 19px;
font-family: ${(props) => props.theme.fonts.title};
`;



export const CreateCardScreen =  ({ navigation }) => {
    const [error, setError] = React.useState(null)
    const [loading, setLoading] = useState(false)
    const [type, setType] = useState("virtual")
    const [exchangeRate, setExchangeRate] = useState(778)
   const [creationFee, setCreationFee] = useState(100)

    const { user, accountDetails } = useAuthStates()


    const createVirtualCard = async () => {
    if(!type) {
      Alert.alert(
        "Error",
        'Please select card type',
        [{ text: "Okay", onPress: () => setLoading(false) }],
        {
          cancelable: true,
        }
      )
      return
    }

    if(Number(creationFee) > Number(accountDetails.availableBalance)) {
      Alert.alert(
        "Error",
        'Your funds are not enough to create the card',
        [{ text: "Okay", onPress: () => setLoading(false) }],
        {
          cancelable: true,
        }
      )
      return
    }
     
    navigation.navigate("Confirm", {
      type: "create card",
      data: {
        exchangeRate: exchangeRate,
        creationFee: creationFee
      }
    })
    }

   useEffect(() => {

  }, [])
  
  


    return (
       <Provider>
         <CardBackground>
         {loading && <ProgressBar progress={0.5} color="blue" indeterminate={true} /> }
      <ScrollView>
      <Info>Lets help you create a new card!, Please fill our the required details</Info>
        <CardType>
        <DropS>
     <RNPickerSelect
             placeholder={{label: "Select Type"}}
            onValueChange={(value) => setType(value)}
            items={[
                { label: 'Virtual', value: 'virtual' },
            ]}
        />
    </DropS>
   <FundingWrapper>
   <Info>Card creation fee: N{creationFee}</Info>
    </FundingWrapper> 
        </CardType>
    <Button onPress={() => createVirtualCard()} mode="contained">Create Card</Button> 
    </ScrollView>
         </CardBackground>
         </Provider>
    )
}