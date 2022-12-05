import React, { useState,useEffect } from "react";
import { Text, View, TouchableOpacity, TextInput, Alert, Platform } from "react-native";
import styled from "styled-components/native";
import { Modal, Portal, Provider,Button, ActivityIndicator, IconButton } from "react-native-paper";
import * as LocalAuthentication from 'expo-local-authentication';
import { useAuthStates } from "../../hooks/useAuthStates";

const Background = styled.View`
flex: 1;
align-items: center;
background-color: white;
`;

const Header = styled.View`
padding-top: 40px;
`;

const SmallLabel = styled.Text`
text-align: center;
font-size: 18px;
font-family: ${(props) => props.theme.fonts.title};
padding: 2px;
`;

const NameLabel = styled.Text`
text-align: center;
font-size: 26px;
padding: 5px;
font-family: ${(props) => props.theme.fonts.heading};
`;

const AmountLabel = styled.Text`
text-align: center;
font-size: 22px;
padding: 10px;
font-family: ${(props) => props.theme.fonts.heading};
`;

const RoundedButton = styled(TouchableOpacity)`
width: 150px;
margin-top: 29px
padding: 25px;
border-radius: 90px;
align-items: center;
background-color: #52ab98;
`;

const RoundedText = styled.Text`
font-size: 24px;
color: white;
font-family: ${(props) => props.theme.fonts.title};
`;

const Buton = styled(Button).attrs({
 
})`
width: 170px;
font-size: 25px;
background-color: ${(props) => props.theme.colors.ui.color}
padding: 12px;
font-size: 26px;
margin: 20px;
`;

export const ConfirmScreen = ({ navigation, route }) => {
    const [visible, setVisible] = React.useState(false)
    const [pin, setPin] = React.useState(null)
    const [loading, setLoading] = useState(false)
    const [isBiometricSupported, setIsBiometricSupported] = useState(false);
      const [fingerprint, setFingerprint] = useState(false);
 
    const { user, loginPin } = useAuthStates()
    const { data, type } = route.params;

    const labels = {
      "KD-VTU-MTNNG": "MTN",
      "KD-VTU-ATNG": "Airtel",
      "KD-VTU-9NG": "9 Mobile",
      "KD-VTU-GLNG": "Glo"
    }


    const checkPin = () => {
      if(pin === loginPin) {
        setVisible(false)
        type === "airtime" ? handleBuyAirtime() : type === "transfer" ? handleSendMoney(): type === "create card" ? handleCreateCard() : type === "card funding" ? handleFundCard() : handleWithdrawFromCard()
      }else {
        Alert.alert(
          "Error",
          "Invalid pin",
          [{ text: "Okay", onPress: () => null }],
          {
            cancelable: false,
          }
        );
      }
    }


    const handleCreateCard = async () => {
     
      const newdata = {
        firstName: user.first_name,
            lastName: user.last_name,
            email: user.email,
            phoneNumber: user.phone_number,
            id: user.id,
            state: user.state,
            city: user.city,
            address: user.address,
            nin: user.nationalId,
            bvn: user.bvn,
            bridge_id: null,
            kuda_ref: user.kuda_ref,
            feeCharge: `${data.creationFee}`

      }

      const olddata = {
            id: user.id,
            bridge_id: user.bridge_id,
            kuda_ref: user.kuda_ref,
            feeCharge: `${data.creationFee}`
      }

      const reqIndex = !user.bridge_id ? newdata : olddata

      console.log(reqIndex)
    
      setLoading(true)
       try {
        const cReq = await fetch('https://api.hytello.com.ng/create-card', {
          method: 'post',
          headers: {
              'Content-Type': 'application/json',
             },
         body: JSON.stringify({
           ...reqIndex
         })
      })
  
      const cardData = await cReq.json()

      if(cReq.status === 200) {
        setLoading(false)
        Alert.alert(
          "Success",
          `${cardData}`,
          [{ text: "Okay", onPress: () => navigation.navigate("Cards") }],
          {
            cancelable: false,
          }
        )
      }else if(cReq.status === 400){
        setLoading(false)
        console.log(cReq.status)
        Alert.alert(
          "Error",
          `${cardData}`,
          [{ text: "Okay", onPress: () => setLoading(false) }],
          {
            cancelable: false,
          }
        )
      }else {
        setLoading(false)
        console.log(cardData)
      }

       }catch(error) {
        console.log(error)
        setLoading(false)
       }
    }

    const handleBuyAirtime = async () => {
        try {
          setLoading(true)
          const sreq = await fetch('https://api.hytello.com.ng/buy-airtime', {
            method: 'post',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
              phoneNumber: data.number,
              ref: user.kuda_ref,
              amount: data.amount,
              identifier: data.operator
            })
          })
  
          const dtA = await sreq.json()
  
         if(sreq.status === 200) {
          setLoading(false)
            navigation.navigate("TopUpSuccess", {
              amount: data.amount,
              number: data.number,
              type: "airtime"
            })
         }else {
            setLoading(false)
            console.log(dtA)
            Alert.alert(
              "Error",
              "Something went wrong please try again later",
              [{ text: "Okay", onPress: () => null }],
              {
                cancelable: true,
              }
            )
         } 
        
        } catch(error) {
          setLoading(false)
          Alert.alert(
            "Error",
            "Something went wrong please try again later",
            [{ text: "Okay", onPress: () => null }],
            {
              cancelable: true,
            }
          )
            console.log(error)
        }
    }

    const handleSendMoney = async () => {
      const checkB = Number(data.amount) + Number(data.transferCharge)
      console.log(data)
      if(checkB > user.availableBalance) {
        Alert.alert(
          "Error",
          "You dont have enough funds to proceed",
          [{ text: "Okay", onPress: () => null }],
          {
            cancelable: true,
          }
        )
//
        return
      }
      setLoading(true)
       try {
        const sreq = await fetch('https://api.hytello.com.ng/send-money', {
          method: 'post',
          headers: {'Content-Type': 'application/json'},
          body: JSON.stringify({
            trData: {
              ...data,
              ref: user.kuda_ref,
              senderName: `${user.first_name}` + " " + `${user.last_name}`
            }
          })
        })

        const dtA = await sreq.json()

       if(sreq.status === 200) {
        setLoading(false)
          navigation.navigate("TopUpSuccess", {
            amount: data.amount,
            name: data.beneficiaryName,
            type: "transfer"
          })
       }else {
          setLoading(false)
          console.log(dtA)
          Alert.alert(
            "Error",
            "Something went wrong please try again",
            [{ text: "Okay", onPress: () => null }],
            {
              cancelable: true,
            }
          )
       } 
       

       }catch(error) {
          setLoading(false)
          console.log(error)
       }
    }

    
  const handleFundCard = async () => {
    setLoading(true)
    console.log("running...")
    try {
     const fundReq = await fetch('https://api.hytello.com.ng/fund-card', {
       method: 'post',
       headers: {
           'Content-Type': 'application/json',
          },
      body: JSON.stringify({
         fundingAmount: data.amount,
         feeCharge: data.exchangeFee,
         cardId: data.cardId,
         kuda_ref: user.kuda_ref
      })
   })

   const fundData = await fundReq.json()

   if(fundReq.status === 200) {
     setLoading(false)
     Alert.alert(
       "Success",
       `${fundData}`,
       [{ text: "Okay", onPress: () => navigation.navigate("Cards") }],
       {
         cancelable: false,
       }
     )
   }else {
     setLoading(false)
     Alert.alert(
       "Error",
       `${fundData}`,
       [{ text: "Okay", onPress: () =>  navigation.navigate("Cards") }],
       {
         cancelable: false,
       }
     )
   }

    }catch(error) {
      setLoading(false)
     console.log(error)
     console.log("failed")
    }
  }

  const handleWithdrawFromCard = async () => {
    setLoading(true)
    try {
     const withReq = await fetch('https://api.hytello.com.ng/withdraw-from-card', {
       method: 'post',
       headers: {
           'Content-Type': 'application/json',
          },
      body: JSON.stringify({
         withdrawAmount: data.amount,
         gettingAmount: data.gettingFee,
         cardId: data.cardId,
         kuda_ref: user.kuda_ref
      })
   })

   const withData = await withReq.json()

   if(withReq.status === 200) {
     setLoading(false)
     console.log(withReq.status)
     Alert.alert(
       "Success",
       `${withData}`,
       [{ text: "Okay", onPress: () => navigation.navigate("Cards") }],
       {
         cancelable: false,
       }
     )
   }else {
     setLoading(false)
     console.log(withReq.status)
     console.log(withData)
     Alert.alert(
       "Error",
       `${withData}`,
       [{ text: "Okay", onPress: () =>  navigation.navigate("Cards") }],
       {
         cancelable: false,
       }
     )
   }

    }catch(error) {
      setLoading(false)
     console.log(error)
    }
  }
  

    const handle = async () => {
      try {
          const biometricAuth = await LocalAuthentication.authenticateAsync({
              disableDeviceFallback: true,
              cancelLabel: "Cancel",
          });
          if (biometricAuth.success) {
            type === "airtime" ? handleBuyAirtime() : type === "transfer" ? handleSendMoney(): type === "create card" ? handleCreateCard() : type === "card funding" ? handleFundCard() : handleWithdrawFromCard()
          }
      } catch (error) {
          console.log(error);
      }
  };



    useEffect(() => {
      (async () => {
          const compatible = await LocalAuthentication.hasHardwareAsync();
          setIsBiometricSupported(compatible);
          const enroll = await LocalAuthentication.isEnrolledAsync();
          if (enroll) {
              setFingerprint(true);
          }
      })();
  }, []);


    return (
<Provider>
<Portal>
  <Modal visible={visible} onDismiss={() => setVisible(false)} contentContainerStyle={{ backgroundColor: 'white', width: '95%', height: 200, alignSelf: 'center', alignItems: 'flex-start', justifyContent: 'flex-start', padding: 20}}>
    <Text style={{ textAlign: 'left', fontSize: 22}}>Pin</Text>
    <TextInput placeholder="****" value={pin} onChangeText={(text) => setPin(text)} style={{ width: '100%', fontSize: 20, backgroundColor: 'gainsboro', padding: 14}} multiline={false} maxLength={4} />
    <Buton style={{ alignSelf: 'center'}} onPress={() => checkPin()} mode="contained">Submit</Buton>
  </Modal>
</Portal>
<Background>
      {type === "transfer" && (  <Header>
       <SmallLabel>To:</SmallLabel>
       <NameLabel>{data.beneficiaryName}</NameLabel>
       <SmallLabel>Amount:</SmallLabel>
       <AmountLabel>{data.amount}</AmountLabel>
       <SmallLabel>Transaction Fee:</SmallLabel>
       <AmountLabel>{data.transferCharge}</AmountLabel>
       <SmallLabel>Narration:</SmallLabel>
       <AmountLabel>{data.narration}</AmountLabel>
       </Header>
      )}
      {type === "create card" && (  <Header>
       <SmallLabel>Creation Fee:</SmallLabel>
       <AmountLabel>N{data.creationFee}</AmountLabel>
       <SmallLabel>Type:</SmallLabel>
       <AmountLabel>Virtual card</AmountLabel>
       <SmallLabel>Total charge:</SmallLabel>
       <AmountLabel>N4959.00</AmountLabel>
       </Header>
      )}
       {type === "withdraw from card" && (  <Header>
       <SmallLabel>Withdraw Amount:</SmallLabel>
       <AmountLabel>${data.amount}</AmountLabel>
       <SmallLabel>Getting Amount:</SmallLabel>
       <AmountLabel>N{data.gettingFee}</AmountLabel>
       </Header>
      )}
          {type === "card funding" && (  <Header>
       <SmallLabel>Funding amount:</SmallLabel>
       <AmountLabel>${data.amount}</AmountLabel>
       <SmallLabel>Type:</SmallLabel>
       <AmountLabel>Card funding</AmountLabel>
       <SmallLabel>Paying fee:</SmallLabel>
       <AmountLabel>N{data.exchangeFee}</AmountLabel>
       </Header>
      )}
       {type === "airtime" && (  <Header>
       <SmallLabel>To:</SmallLabel>
       <NameLabel>{data.number}</NameLabel>
       <SmallLabel>Amount:</SmallLabel>
       <AmountLabel>{data.amount}</AmountLabel>
       <SmallLabel>Operator:</SmallLabel>
       <AmountLabel>{labels[data.operator]}</AmountLabel>
       </Header>
      )}
      

       <View style={{ borderBottomWidth: 1, borderBottomColor: 'gray', paddingTop: 10, paddingBottom: 10, width: '95%', margin: 'auto'}} />
     {!isBiometricSupported || !fingerprint && !loading  && Platform.OS === "android" &&  <RoundedButton onPress={() => setVisible(true)}>
        <RoundedText>Confirm</RoundedText>
      </RoundedButton> }
      {!loading  && Platform.OS === "ios" &&  <RoundedButton onPress={() => setVisible(true)}>
        <RoundedText>Confirm</RoundedText>
      </RoundedButton> }

     {isBiometricSupported && fingerprint && !loading && Platform.OS === "android" && <IconButton
    icon="fingerprint"
    iconColor="black"
    size={55}
    style={{ marginTop: 15}}
    onPress={() => handle()}
  /> }

      {loading && <ActivityIndicator size={46} style={{ marginTop: 20 }} color="teal" />}
     </Background>

</Provider>
    )
}