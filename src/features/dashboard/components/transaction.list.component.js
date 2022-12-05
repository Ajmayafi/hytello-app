import React, { useContext } from "react";
import { AuthContext } from "../../../services/authentication/auth.context";
import styled from "styled-components/native";
import { Text, View, TouchableOpacity } from "react-native";
import { List, Avatar } from 'react-native-paper';

const TransactionBackground = styled.View`

`;

const AvatarItem = styled(Avatar.Text).attrs({
})`
align-items: center;
margin: auto;
margin-right: 17px;
margin-left: 12px;
`;

const TransactionCard = styled(List.Item)`
width: 70%;
font-family: ${(props) => props.theme.fonts.title};
`;

const TransactionContainer = styled.View`
flex-direction: row;
`;

const AmountEnd = styled.View`
align-items: center;
justify-content: center;
color: green;
font-weight: bold;
width: 30%;
`;

const AmountTitle = styled.Text`
color: gray;
font-size: 22px;
font-family: ${(props) => props.theme.fonts.title};
`;

const TransactionDetWrapper = styled(TouchableOpacity)`
flex-direction: row;
margin-top: -18px;
`;


export const TransactionList = ({ navigate, transactions }) => {
  const { user, darkMode } = useContext(AuthContext);

  return (
     <TransactionBackground
     >
        {transactions && transactions.length >=1 && transactions.map((trs, i) => (
                 <TransactionContainer key={i}>
                  <TransactionDetWrapper
                  style={{
                    borderBottomColor: '#808080',
                    borderBottomWidth: 1,
                    marginBottom: 30,
                  }}
                     onPress={() => navigate("ViewTransaction", {
                      details: trs
                    })}
                  >
                    <TransactionCard
    title={trs.reciepientName ? trs.reciepientName : trs.senderName ? trs.senderName : trs.merchant }
    description={trs.financialDate}
    titleStyle={{ color: darkMode ? "gainsboro" : "black"}}
    descriptionStyle={{ color: darkMode ? "grey" : "black"}}
    left={props => <AvatarItem label="LD" style={{ backgroundColor: darkMode ? "teal" : "black"}} size={24} /> }
  />
  <AmountEnd>
  <View>
  <AmountTitle>₦{trs.amount}</AmountTitle>
  </View>
  </AmountEnd>
                  </TransactionDetWrapper>
                {/* {trs.type === 'deposit' && (
                  <TransactionDetWrapper
                  style={{
                    borderBottomColor: '#808080',
                    borderBottomWidth: 1,
                    marginBottom: 30,
                  }}
                onPress={() => navigate("ViewTransaction", {
                      reference: trs.reference
                    })}
                  >
                         <TransactionCard
    title="Money Top Up"
    description="Via Paystack"
    left={props => <AvatarItem label="PS" color="black" style={{ backgroundColor: 'orange',}} size={24} />}
  />
  <AmountEnd>
  <View>
  <AmountTitle style={{ color: 'green'}}>₦{trs.amount}</AmountTitle>
  </View>
  </AmountEnd>
                  </TransactionDetWrapper>
                )} */}

             </TransactionContainer>
            ))}
  </TransactionBackground>
  )
}