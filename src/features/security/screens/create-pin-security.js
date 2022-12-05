import React, { useEffect, useState } from 'react';
import styled from "styled-components/native";
import { IconButton, ActivityIndicator } from 'react-native-paper';
import { View, Alert } from "react-native";
import { Ionicons } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage'; 
import { useAuthStates } from '../../../hooks/useAuthStates';

const Background = styled.View`
flex: 1;
justify-content: center;
`;

const Header  = styled.View`
align-self: center;
justify-content: center;
`;

const Title = styled.Text`
text-align: center;
font-size: 24px;
`;

const PinViewer = styled.View`

`;

const Row  = styled.View`
flex-direction: row;
justify-content: space-evenly;
`;


export const CreateSecurityPinScreen = () => {
  const [pinInput, setPinInput] = useState('')
  const [confirmPin, setConfirmPin] = useState("")
  const [pageIndex, setPageIndex] = useState(1)
  const [loading, setLoading] = useState(false)

  const arrayMap = [{}, {}, {}, {}]
  const { dispatch, user } = useAuthStates()

  const pLength = pinInput.split("")
  const cPLength = confirmPin.split("")

  const handleGetVirtualAccountDetails = async () => {
    setLoading(true)
    try {
      const res = await fetch('https://api.hytello.com.ng/get-virtual-details', {
        method: 'post',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({
          ref: user.kuda_ref
        })
      })
      const data = await res.json()
      if(res.status === 200) {
        setLoading(false)
        dispatch({ type: 'UPDATE_PIN', payload: pinInput})
        dispatch({ type: 'UPDATE_ACCOUNT_DETAILS', payload: data })
      }else {
        Alert.alert(
          "Sorry",
          "Something went wrong from our end, please try again",
          [{ text: "Okay", onPress: () => null }],
          {
            cancelable: true,
          }
        )
      }
    } catch(error) {
      Alert.alert(
        "Sorry",
        "Error occured, please try again",
        [{ text: "Okay", onPress: () => null }],
        {
          cancelable: true,
        }
      )
    }
  }


  const handleCheck = async () => {
     if(pinInput === confirmPin) {
        try {
            await AsyncStorage.setItem('@login_pin', pinInput)
            handleGetVirtualAccountDetails()
          } catch (e) {
            // saving error
            console.log(e)
          }
     }else {
      Alert.alert(
        "Error",
        "Incorrect pin",
        [{ text: "Okay", onPress: () =>  {
            setPinInput('')
            setConfirmPin('')
            setPageIndex(1)
        }}],
        {
          cancelable: false,
        }
      )
     }
  }
//
  const handleAdd = (value) => {
         const newValue = pinInput + value;
         pinInput.length < 4 ? setPinInput(newValue) : null
  }

  const handleAddConfirm = (value) => {
    const newValue = confirmPin + value;
    confirmPin.length < 4 ? setConfirmPin(newValue) : null
}

  const handleDelete  = () => {
     const newValue = pinInput.slice(0, -1);
     setPinInput(newValue)
  }

  const handleDeleteConfirm  = () => {
    const newValue = confirmPin.slice(0, -1);
    setConfirmPin(newValue)
 }


 useEffect(() => {
    if(pinInput.length === 4) {
        setPageIndex(2)
    }
 }, [pinInput])

  return  (
    <Background>
     {pageIndex === 1 && (
    <>
    <Header>
     {!pinInput && <Title>Create your pin</Title> }
     <Row>
     {!pinInput && arrayMap.map((i) => (
      <Ionicons name='md-radio-button-off-outline'size={34} />
     ))}
       </Row>
       <Row>
     {pinInput && pLength.map((i) => (
       <Ionicons name='md-radio-button-on' size={34} />
     ))}
      </Row>
    </Header>
    <Row>
    <IconButton
    icon="numeric-1"
    iconColor="black"
    size={55}
    style={{ marginTop: 15}}
    onPress={() => handleAdd('1')}
  />
   <IconButton
    icon="numeric-2"
    iconColor="black"
    size={55}
    style={{ marginTop: 15}}
    onPress={() => handleAdd('2')}
  />
   <IconButton
    icon="numeric-3"
    iconColor="black"
    size={55}
    style={{ marginTop: 15}}
    onPress={() => handleAdd('3')}
  />
    </Row>
    <Row>
    <IconButton
    icon="numeric-4"
    iconColor="black"
    size={55}
    style={{ marginTop: 15}}
    onPress={() => handleAdd('4')}
  />
   <IconButton
    icon="numeric-5"
    iconColor="black"
    size={55}
    style={{ marginTop: 15}}
    onPress={() => handleAdd('5')}
  />
   <IconButton
    icon="numeric-6"
    iconColor="black"
    size={55}
    style={{ marginTop: 15}}
    onPress={() => handleAdd('6')}
  />
    </Row>
    <Row>
    <IconButton
    icon="numeric-7"
    iconColor="black"
    size={55}
    style={{ marginTop: 15}}
    onPress={() => handleAdd('7')}
  />
   <IconButton
    icon="numeric-8"
    iconColor="black"
    size={55}
    style={{ marginTop: 15}}
    onPress={() => handleAdd('8')}
  />
   <IconButton
    icon="numeric-9"
    iconColor="black"
    size={55}
    style={{ marginTop: 15}}
    onPress={() => handleAdd('9')}
  />
    </Row>
    <Row style={{ alignSelf: 'flex-end', justifyContent: 'center', paddingRight: 17}}>
    <IconButton
    icon="backspace"
    iconColor="black"
    size={55}
    style={{ marginTop: 15}}
    onPress={() => handleDelete()}
  />
   <IconButton
    icon="numeric-0"
    iconColor="black"
    size={55}
    style={{ marginTop: 15}}
    onPress={() => handleAdd('0')}
  />
  
    </Row>
    </>
    )}
       {pageIndex === 2 && (
    <>
    <Header>
     {!confirmPin && <Title>Confirm pin</Title> }
     <Row>
     {!confirmPin && arrayMap.map((i) => (
      <Ionicons name='md-radio-button-off-outline' size={34}  />
     ))}
       </Row>
       <Row>
     {confirmPin && cPLength.map((i) => (
       <Ionicons name='md-radio-button-on' size={34} />
     ))}
      </Row>
    </Header>
    <Row>
    <IconButton
    icon="numeric-1"
    iconColor="black"
    size={55}
    style={{ marginTop: 15}}
    onPress={() => handleAddConfirm('1')}
  />
   <IconButton
    icon="numeric-2"
    iconColor="black"
    size={55}
    style={{ marginTop: 15}}
    onPress={() => handleAddConfirm('2')}
  />
   <IconButton
    icon="numeric-3"
    iconColor="black"
    size={55}
    style={{ marginTop: 15}}
    onPress={() => handleAddConfirm('3')}
  />
    </Row>
    <Row>
    <IconButton
    icon="numeric-4"
    iconColor="black"
    size={55}
    style={{ marginTop: 15}}
    onPress={() => handleAddConfirm('4')}
  />
   <IconButton
    icon="numeric-5"
    iconColor="black"
    size={55}
    style={{ marginTop: 15}}
    onPress={() => handleAddConfirm('5')}
  />
   <IconButton
    icon="numeric-6"
    iconColor="black"
    size={55}
    style={{ marginTop: 15}}
    onPress={() => handleAddConfirm('6')}
  />
    </Row>
    <Row>
    <IconButton
    icon="numeric-7"
    iconColor="black"
    size={55}
    style={{ marginTop: 15}}
    onPress={() => handleAddConfirm('7')}
  />
   <IconButton
    icon="numeric-8"
    iconColor="black"
    size={55}
    style={{ marginTop: 15}}
    onPress={() => handleAddConfirm('8')}
  />
   <IconButton
    icon="numeric-9"
    iconColor="black"
    size={55}
    style={{ marginTop: 15}}
    onPress={() => handleAddConfirm('9')}
  />
    </Row>
    <Row>
    <IconButton
    icon="backspace"
    iconColor="black"
    size={55}
    style={{ marginTop: 15}}
    onPress={() => handleDeleteConfirm()}
  />
   <IconButton
    icon="numeric-0"
    iconColor="black"
    size={55}
    style={{ marginTop: 15}}
    onPress={() => handleAddConfirm('0')}
  />
  {!loading && <IconButton
    icon="arrow-right-drop-circle"
    iconColor="black"
    size={55}
    style={{ marginTop: 15}}
    onPress={() => handleCheck()}
  />
   }
    {loading && <ActivityIndicator size={35} color="teal" />}
    </Row>
    </>
    )}
    </Background>
  )
}