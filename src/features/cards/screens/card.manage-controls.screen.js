import React from "react";
import { View, Text } from "react-native";
import { Switch, Surface, Button as PaperButton, ProgressBar, Dialog, Paragraph, Portal, Provider } from 'react-native-paper';
import styled from "styled-components/native";
import CurrencyInput from 'react-native-currency-input';
import RNPickerSelect from 'react-native-picker-select';


const OptionWrapper = styled(Surface)`
flex-direction: row;
margin-bottom: 12px;
margin: 10px;
padding: 12px;
align-items: center;
`;

const Title = styled.Text`
font-size: 26px;
font-family: ${(props) => props.theme.fonts.title};
`;

const SwitchContainer = styled.View`
margin-left: auto;
`;

const Info = styled.Text`
padding-left: 10px;
font-family: ${(props) => props.theme.fonts.title};
font-size: 23px;
`;

const ChannelControls = styled.View`

`;

const AmountS = styled.View`
width: 85%;
max-width: 300px;
background-color: #E4E4E4;
padding: 20px;
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


const Button = styled(PaperButton)`
width: 200px;
padding: 10px;
background-color: ${(props) => props.theme.colors.ui.color}
margin: auto;
margin-top: 15px;
`;

const SpendingLimits = styled.View`
justify-content: center;
align-items: center;
`;

export const CardControlsScreen = ({ route, navigation }) => {
    const { card } = route.params;

    const [isWebSwitchOn, setIsWebSwitchOn] = React.useState(card.spendingControls.channels.web);
    const [isAtmSwitchOn, setIsAtmSwitchOn] = React.useState(card.spendingControls.channels.atm);
    const [isPosSwitchOn, setIsPosSwitchedOn] = React.useState(card.spendingControls.channels.pos);
    const [visible, setVisible] = React.useState(false);
    const [amountLimit, setAmountLimit] = React.useState(card.spendingControls.spendingLimits[0].amount);
    const [loading, setLoading] = React.useState(false);
    const [interval, setInterval] = React.useState(card.spendingControls.spendingLimits[0].interval)


    const handleUpdateControls = () => {
        const options = {
            method: 'PUT',
            headers: {
              accept: 'application/json',
              'content-type': 'application/json',
              Authorization: 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MzE1NDNjOWI0YjMxZjg5ZTdkYTUwMTEiLCJlbWFpbEFkZHJlc3MiOiJhamFtaWVlbHVAZ21haWwuY29tIiwianRpIjoiNjM0MDRiYTNiNjgxMWY0ZGQ4NWJmN2M0IiwibWVtYmVyc2hpcCI6eyJfaWQiOiI2MzE1NDNjOWI0YjMxZjg5ZTdkYTUwMTQiLCJidXNpbmVzcyI6eyJfaWQiOiI2MzE1NDNjOWI0YjMxZjg5ZTdkYTUwMGYiLCJuYW1lIjoiSHl0ZWxsbyBOaWdlcmlhIEx0ZCIsImlzQXBwcm92ZWQiOnRydWV9LCJ1c2VyIjoiNjMxNTQzYzliNGIzMWY4OWU3ZGE1MDExIiwicm9sZSI6IkFQSUtleSJ9LCJpYXQiOjE2NjUxNTgwNTEsImV4cCI6MTY2NTc2Mjg1MX0.8vbVJA2gAfWe3Z73mB2U4TLUNN_dCHKlE29lR0OOpHw'
            },
            body: JSON.stringify({
              status: 'active',
              spendingControls: {
                allowedCategories: [],
                blockedCategories: [],
                channels: {atm: isAtmSwitchOn, pos: isPosSwitchOn, web: isWebSwitchOn, mobile: true},
                spendingLimits: [{interval: "daily", amount: amountLimit}]
              }
            })
          };

          setLoading(true)
          fetch(`https://api.sandbox.sudo.cards/cards/${card._id}`, options)
            .then(response => response.json())
            .then(response => {
                console.log(response)
                setLoading(false)
                if(response.statusCode === 200) {
                    setVisible(true)
                }
            })
            .catch(err => {
                setLoading(false)
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
              <Paragraph>Card has been updated successfully!</Paragraph>
            </Dialog.Content>
            <Dialog.Actions>
              <Button mode="contained" onPress={() => navigation.navigate("Cards")}>Okay</Button>
            </Dialog.Actions>
          </Dialog>
        </Portal>
        <SpendingLimits>
        <Info>
        Manage your daily spending limit
       </Info>
       
        <AmountS style={{
        borderBottomColor: '#808080',
        borderBottomWidth: 1,
        marginBottom: 30,
      }}>
         <CurrencyInput
      value={amountLimit}
      onChangeValue={setAmountLimit}
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

        </SpendingLimits>
        <ChannelControls>
       <Info>
        Manage where your cards works
       </Info>
        <OptionWrapper elevation={3}>
        <Title>Web</Title>
        <SwitchContainer>
        <Switch value={isWebSwitchOn} size={10} onValueChange={() => setIsWebSwitchOn(!isWebSwitchOn)} />
        </SwitchContainer>
        </OptionWrapper>
        <OptionWrapper elevation={3}>
        <Title>POS</Title>
        <SwitchContainer>
        <Switch value={isPosSwitchOn} size={10} onValueChange={() => setIsPosSwitchedOn(!isPosSwitchOn)} />
        </SwitchContainer>
        </OptionWrapper>
        <OptionWrapper elevation={3}>
        <Title>Atm</Title>
        <SwitchContainer>
        <Switch value={isAtmSwitchOn} size={10} onValueChange={() => setIsAtmSwitchOn(!isAtmSwitchOn)} />
        </SwitchContainer>
        </OptionWrapper>
        </ChannelControls>
        {!loading && <Button onPress={() => handleUpdateControls()} mode="contained">Update</Button> }
          {loading && <Button disabled mode="contained">Update</Button> }
        </View>
        </Provider>
    )
}