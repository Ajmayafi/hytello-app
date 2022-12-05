import React, { useState } from "react";
import { View, Text } from "react-native";
import { TextInput, Button as PaperButton, ProgressBar, Dialog, Paragraph, Portal, Provider } from "react-native-paper";
import styled from "styled-components/native";
import { useCardManage } from "../../../hooks/useCardManage";

const Info = styled.Text`
padding: 15px;
font-family: ${(props) => props.theme.fonts.title};
font-size: 19px;
`;

const PinInput = styled(TextInput)`
width: 96%;
margin: auto;
margin-bottom: 10px;
`;

const Label = styled.Text`
font-size: 16px;
padding-left: 10px;
font-family: ${(props) => props.theme.fonts.heading};
`;

const FormContainer = styled.View`

`;

const Button = styled(PaperButton)`
width: 200px;
padding: 10px;
background-color: ${(props) => props.theme.colors.ui.color}
margin: auto;
margin-top: 15px;
`;

const ErrorPortal= styled(Portal)`
height: 100%;
position: absolute;
`;

const ErrorDialog = styled.View`
position: absolute;
height: 100%;
width: 100%;
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





export const ChangeCardPinScreen = ({ route, navigation }) => {
    const [oldPin, SetOldPin] = useState(null);
    const [newCardPin, setNewCardPin] = useState(null);
    const [error, setError] = useState("Notthing is good")
    const [visible, setVisible] = React.useState(false);
    const [loading, setLoading] = useState(false)

    const { id } = route.params;


    const ChangePin = () => {
        const options = {
            method: 'PUT',
            headers: {
              accept: 'application/json',
              'content-type': 'application/json',
              Authorization: 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MzE1NDNjOWI0YjMxZjg5ZTdkYTUwMTEiLCJlbWFpbEFkZHJlc3MiOiJhamFtaWVlbHVAZ21haWwuY29tIiwianRpIjoiNjM0MDRiYTNiNjgxMWY0ZGQ4NWJmN2M0IiwibWVtYmVyc2hpcCI6eyJfaWQiOiI2MzE1NDNjOWI0YjMxZjg5ZTdkYTUwMTQiLCJidXNpbmVzcyI6eyJfaWQiOiI2MzE1NDNjOWI0YjMxZjg5ZTdkYTUwMGYiLCJuYW1lIjoiSHl0ZWxsbyBOaWdlcmlhIEx0ZCIsImlzQXBwcm92ZWQiOnRydWV9LCJ1c2VyIjoiNjMxNTQzYzliNGIzMWY4OWU3ZGE1MDExIiwicm9sZSI6IkFQSUtleSJ9LCJpYXQiOjE2NjUxNTgwNTEsImV4cCI6MTY2NTc2Mjg1MX0.8vbVJA2gAfWe3Z73mB2U4TLUNN_dCHKlE29lR0OOpHw'
            },
            body: JSON.stringify({oldPin: oldPin, newPin: newCardPin})
          };
          
          setLoading(true)
          fetch(`https://api.sandbox.sudo.cards/cards/${id}/pin`, options)
            .then(response => response.json())
            .then(response => {
                setLoading(false)
                console.log(response)
                if(response.statusCode === 200) {
                   setVisible(true)
                }
            })
            .catch(err => {
                setLoading(false)
                console.error(err)
                setError(err)
            });
    }

    return (
        <Provider>
        <View>
            {loading && <ProgressBar progress={0.5} color="blue" indeterminate={true} /> }
            <Portal>
          <Dialog visible={visible} dismissable={false}>
            <Dialog.Title>Success</Dialog.Title>
            <Dialog.Content>
              <Paragraph>Pin has been updated successfully!</Paragraph>
            </Dialog.Content>
            <Dialog.Actions>
              <Button mode="contained" onPress={() => navigation.navigate("Cards")}>Okay</Button>
            </Dialog.Actions>
          </Dialog>
        </Portal>
            <Info>Your 4 digit transaction PIN secures your transactions.
                Its important that you don't share this pin with anyone.
             </Info>
            <FormContainer>
            <Label>Old Pin</Label>
                <PinInput  mode="flat" maxLength={4} placeholder="****" theme={{ colors: { primary: '#52ab98'}}} multiline={false} keyboardType="decimal-pad"
                 value={oldPin} onChangeText={(text) => SetOldPin(text)} 
                 />
                <Label>New Card Pin</Label>
                <PinInput mode="flat" maxLength={4} value={newCardPin} placeholder="****" onChangeText={(text) => setNewCardPin(text)} 
                multiline={false} keyboardType="phone-pad" theme={{ colors: { primary: '#52ab98'}}} />
                {!loading && <Button onPress={() => ChangePin()} mode="contained">Update</Button> }
                {loading && <Button disabled mode="contained">Update</Button> }
            </FormContainer>
        </View>               
        </Provider>
    )
}