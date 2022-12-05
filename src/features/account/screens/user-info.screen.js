import React, { useState, useContext, useEffect } from "react";
import styled from "styled-components/native";
import LottieView from "lottie-react-native";
import { Alert, Text } from "react-native";
import { Button, TextInput, Provider, ProgressBar, ActivityIndicator, Surface } from "react-native-paper";
import { useAuthStates } from "../../../hooks/useAuthStates";
import { AuthContext } from "../../../services/authentication/auth.context";
import { TouchableOpacity, ScrollView } from "react-native";
import RNPickerSelect from 'react-native-picker-select';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { ErrorComponent } from "../../../components/error.component";
import { NewErrorComponent } from "../../../components/new-error.component";
import { doc, setDoc, getDoc } from "firebase/firestore";
import { db } from "../../../../config";
import { statesList } from "../items/user-items";
import DateTimePickerModal from "react-native-modal-datetime-picker";


const UserInfoBackground = styled.View`
flex: 1;
`;


const UserInfoContainer = styled.View`
align-items: center;
position: absolute;
justify-content: center;
margin: auto;
width: 100%;
height: 100%;
`;

const BgAniWapper = styled.View`
width: 100%;
position: absolute;
height: 100%;
`;



const Title = styled.Text`
font-size: 34px;
color: black;
text-align: center;
padding-bottom: 5px;
font-family: ${(props) => props.theme.fonts.title}
`;

const ButtonStyled = styled(Button)`
width: 160px;
padding: 12px;
background-color: ${(props) => props.theme.colors.ui.color};
font-size: 25px;
margin-bottom: 13px;
`;

const ButtonWrapper = styled.View`
 padding-top: 40px;
`;

const Input = styled(TextInput)`
width: 290px;
margin-bottom: 13px;
`;

const Info = styled.Text`
padding: 6px;
font-family: ${(props) => props.theme.fonts.title};
font-size: 24px;
`;


const DropS = styled.View`
width: 290px;
max-width: 300px;
background-color: #E4E4E4;
align-items: center;
justify-content: center;
text-align: center;
font-size: 60px;
margin-bottom: 25px;
height: 65px;
`;

const DOBInput = styled(Surface)`
  width: 290px;
  height: 66px;
  margin-bottom: 12px;
  background-color: #E4E4E4;
  font-size: 19px;
  color: #c1c1c1;
  align-items: flex-start;
  justify-content: center;
  border-radius: 5px;
`;


export const UserInfoScreen = ({ navigation }) => {
 const [state, setState] = useState(null);
 const [loading, setLoading] = useState(false)
 const [city, setCity] = useState(null);
 const [bvn, setBvn] = useState(null);
 const [dob, setDob] = useState(null);
 const [nationalId, setNationalId] = useState(null);
 const [gender, setGender] = useState(null)
 const [address, setAddress] = useState(null);
 const [isDatePickerVisible, setDatePickerVisibility] = useState(false);

 const { user, userData, dispatch } = useAuthStates()

 
 function filtsStates() {
 let newData = []
 statesList.forEach((l) => (
  newData.push({label: l, value: l})
 ))
 return newData
 }

 const statesData = filtsStates()

  const logout = async () => {
    try{
      await AsyncStorage.removeItem("@userdata")
      dispatch({ type: 'LOGOUT'})
    } catch(error) {
      console.log(error)
    }
  
  }

  const hideDatePicker = () => {
    setDatePickerVisibility(false);
  };

  const handleConfirm = (date) => {
    console.warn("A date has been picked: ", date);
    setDob(date);
    hideDatePicker();
  };

  const handleCreateAccount = async () => {
     if(!state || !city || !dob  || !address || !bvn || !nationalId || !gender) {
      Alert.alert(
        "Error",
        "All field must be filled",
        [{ text: "Okay", onPress: () => setLoading(false) }],
        {
          cancelable: true,
        }
      )

      return
     }

     if(bvn.length < 11 || nationalId.length < 11) {
      Alert.alert(
        "Error",
        "Identification number must not be less than 11",
        [{ text: "Okay", onPress: () => setLoading(false) }],
        {
          cancelable: true,
        }
      )

      return
     }

   
     try {
      setLoading(true)
       const res = await fetch('https://api.hytello.com.ng/create-virtual-account', {
          method: 'post',
          headers: {'Content-Type': 'application/json'},
          body: JSON.stringify({
            firstName: user.first_name,
            lastName: user.last_name,
            email: user.email,
            phoneNumber: user.phone_number,
            address: address,
            id: user.id,
            bvn: bvn,
            nationalId: nationalId,
            state: state,
            city: city,
            gender: gender,
            dob: dob
          })
        })
//
    
        const data = await res.json()

        if(res.status === 200) {
          let result = []
          const docRef = doc(db, "users", user.id)
          const docSnap = await getDoc(docRef)
          result = [userData, docSnap.data()]
          console.log(data)
          await AsyncStorage.setItem("@userdata", JSON.stringify(result))
          dispatch({ type: 'LOGIN', payload: result})
        }else if(res.status === 403){
          setLoading(false)
          console.log(data)
          Alert.alert(
            "Error",
            'Something went wrong please try again later',
            [{ text: "Okay", onPress: () => setLoading(false) }],
            {
              cancelable: true,
            }
          )
        }else if(res.status === 503) {
          setLoading(false)
          console.log(data)
          Alert.alert(
            "Error",
            'Something went wrong on our end we are working hard to fix it, Try again later',
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

  return (
      <UserInfoBackground>

    <ScrollView contentContainerStyle={{  alignItems: 'center', justifyContent: 'center', paddingTop: 30, paddingBottom: 30}}>
    <Title>Account Verification</Title>
    <TouchableOpacity onPress={() => logout()}> 
    <Info>In order to proceed we need to get your details</Info>
    </TouchableOpacity>
    <DropS>
     <RNPickerSelect
             placeholder={{label: "Select State"}}
            onValueChange={(value) => {
              setState(value)
            }}
            items={statesData}
        />
    </DropS>
     <Input
      label="City"
      onChangeText={(text) => setCity(text)}
        textContentType="password"
        value={city}
        theme={{ colors: { primary: '#52ab98'}}}
    />
      <Input
      label="Address"
        textContentType="text"
        onChangeText={(text) => setAddress(text)}
        keyboardType="text"
        value={address}
        theme={{ colors: { primary: '#52ab98'}}}
         autoCapitalize="none"
    />
        <DropS>
     <RNPickerSelect
             placeholder={{label: "Select Gender"}}
            onValueChange={(value) => {
              setGender(value)
            }}
            items={[
              { label: 'Male', value: 'Male'},
              { label: 'Female', value: 'Female'}
            ]}
        />
    </DropS>

      <TouchableOpacity onPress={() => setDatePickerVisibility(true)}>
                <DOBInput>
                  <Text
                    style={{
                      fontSize: 16,
                      textAlign: "left",
                      color: "gray",
                      padding: 10,
                    }}
                  >
                    {dob ? dob.toDateString() : "Select Date Of Birth"}
                  </Text>
                </DOBInput>
              </TouchableOpacity>
              <DateTimePickerModal
                isVisible={isDatePickerVisible}
                mode="date"
                onConfirm={handleConfirm}
                onCancel={hideDatePicker}
                maximumDate={new Date(2006, 10, 20)}
                minimumDate={new Date(1950, 0, 1)}
              />
       <Input
      label="BVN"
        textContentType="telephoneNumber"
        multiline={false}
        maxLength={11}
        value={bvn}
        onChangeText={(text) => setBvn(text)}
        theme={{ colors: { primary: '#52ab98'}}}
        keyboardType="phone-pad"
    />
      <Input
      label="Nin Number"
        textContentType="telephoneNumber"
        multiline={false}
        onChangeText={(text) => setNationalId(text)}
        value={nationalId}
        maxLength={11}
        theme={{ colors: { primary: '#52ab98'}}}
        keyboardType="phone-pad"
    />
    <ButtonWrapper>
     {loading && <ActivityIndicator color="gray" size={45} /> }
    {!loading && <ButtonStyled icon="lock" onPress={() => handleCreateAccount()}  mode="contained">Submit</ButtonStyled>}
  </ButtonWrapper>
    </ScrollView>
    </UserInfoBackground>
  
  )
}