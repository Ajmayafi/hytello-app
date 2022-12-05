import React, { useContext, useEffect, useState } from "react";
import { Text, View, ScrollView, RefreshControl, TouchableOpacity, Alert } from "react-native";
import styled from "styled-components/native";
import { ActivityIndicator } from "react-native-paper";
import { Ionicons } from '@expo/vector-icons';
import { useAuthStates } from "../../../hooks/useAuthStates";
import { TransactionContext } from "../../../services/transactions/transactions.context";

import { TransactionList } from "../../../features/dashboard/components/transaction.list.component";
import { AuthContext } from "../../../services/authentication/auth.context";



export const DashBoardScreen = ({ navigation }) => {
  const { user, dispatch, accountDetails, darkMode } = useAuthStates();
  const [refreshing, setRefreshing] = React.useState(false);
  const [showBalance, setShowBalance] = React.useState(true);
  const { transactions, updateTransactions } = useContext(TransactionContext)
  const [error, setError] = useState(false)
  const [loading, setLoading] = useState(false)

  const DashBoardBackground = styled(ScrollView)`
flex: 1;
background-color: ${darkMode ? "#1A1A1A" : "white"}
`;

const UserBalance = styled.View`
width: 95%;
background-color: ${(props) => props.theme.colors.ui.color};
padding: 25px;
heightL 390px;
text-align: center;
margin: auto;
margin-top: 30px;
border-radius: 12px;
`;

const Title1 = styled.Text`
font-size: 20px;
font-family: ${(props) => props.theme.fonts.title};
text-align: center;
`;

const Title2 = styled.Text`
font-size: 30px;
font-family: ${(props) => props.theme.fonts.heading};
color: ${darkMode ? "white" : "black"};
text-align: center;
`;

const ButtonWrapper = styled.View`
flex-direction: row;
align-items: center;
justify-content: space-evenly;
`;

const TitleMessage = styled.Text`
text-align: center;
font-size: 22px; 
padding-top: 20px;
color: ${darkMode ? "white" : "black"};
`;

const TransactionSection = styled.View`
margin-top: 30px;
`;

const TransactionContainer =  styled(ScrollView)`
margin-top: 10px;
`;


  async function getTransactions() {
    setError(false)
   try {
   setLoading(true)
   const treq = await fetch('https://api.hytello.com.ng/get-transactions', {
     method: 'post',
     headers: {'Content-Type': 'application/json'},
     body: JSON.stringify({
       ref: user.kuda_ref
     })
   })

   const tData = await treq.json()
   if(treq.status === 200) {
      console.log(tData)
      updateTransactions(tData)
   }else {
    Alert.alert(
      "Error",
      'Error occured fetching your transactions',
      [{ text: "Okay", onPress: () => setError(true) }],
      {
        cancelable: false,
      }
    );
   }   
   setLoading(false)
   } catch(error) {
     console.log(error)
     setLoading(false)
     Alert.alert(
       "Error",
       `${error.message}`,
       [{ text: "Okay", onPress: () => setError(true) }],
       {
         cancelable: false,
       }
     );
   } 
 }
 
  async function refresh() {
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
        console.log(data)
      dispatch({ type: 'UPDATE_ACCOUNT_DETAILS', payload: data })
    }
    const treq = await fetch('https://api.hytello.com.ng/get-transactions', {
      method: 'post',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({
        ref: user.kuda_ref
      })
    })

    const tData = await treq.json()
    if(treq.status === 200) {
       if(transactions === tData) {
           
       }else {
         updateTransactions(tData)
       }
     }else {
      Alert.alert(
        "Error",
        "We are having some troubles fetching the transactions, please try again",
        [{ text: "Okay", onPress: () => null }],
        {
          cancelable: false,
        }
      ); 
      setError(true)   
     }

    setRefreshing(false)   
    } catch(error) {
      console.log(error)
      setError(true)
      setRefreshing(false)
    } 
  }

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    refresh()
  }, []);


  useEffect(() => {
   getTransactions()
  }, [])


  return (
    <DashBoardBackground  refreshControl={
      <RefreshControl
        refreshing={refreshing}
        onRefresh={onRefresh} />
      }
        >
    <UserBalance elevation={10}>
     <Title1>Current Balance</Title1>
    {!showBalance && <Title2 onPress={() => setShowBalance(!showBalance)}>*******</Title2> }
    {!accountDetails && error && <Title2>****.**</Title2> }
    {!accountDetails && loading && <Title2>****.**</Title2> }
    {accountDetails && showBalance && <Title2 style={{ color: "black" }} onPress={() => setShowBalance(!showBalance)}>N{accountDetails.availableBalance === 0 ? `0.00` : accountDetails.availableBalance.toString().includes(".") ? `${accountDetails.availableBalance}` : `${accountDetails.availableBalance}.00`}</Title2>}
     <ButtonWrapper>
     <TouchableOpacity onPress={() => navigation.navigate("AddMoney")} >
     <Ionicons name="add-circle" size={48} color="black" />
     </TouchableOpacity>
     <TouchableOpacity onPress={() => navigation.navigate("SendMoney")}>
     <Ionicons name="send" size={48} color="black" />
     </TouchableOpacity>
     </ButtonWrapper>
    </UserBalance>
    <TransactionSection>
    <Title2>Transactions</Title2>
      {loading && <ActivityIndicator animating={true} color="red" size={30} />}
    {error && !transactions && <TitleMessage>Something went wrong</TitleMessage>}
    {transactions && transactions.postingsHistory.length === 0 && !loading && <TitleMessage>No transactions</TitleMessage>}
    </TransactionSection>
    <TransactionContainer>
      {transactions && transactions.postingsHistory.length >=1  &&!loading && <TransactionList navigate={navigation.navigate} transactions={transactions.postingsHistory} /> }
      </TransactionContainer>
    </DashBoardBackground>
  )
}