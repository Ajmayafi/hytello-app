import React, { useState, useContext, useEffect } from "react";
import { AuthContext } from "../../../services/authentication/auth.context";
import { Text, View, ScrollView, Alert, RefreshControl  } from "react-native";
import { useFocusEffect } from '@react-navigation/native';
import { Surface, List, IconButton, Button,  Dialog, Portal, Provider, ProgressBar, ActivityIndicator   } from "react-native-paper";
import styled from "styled-components/native";
import { NoCardFoundScreen } from "./no.card.screen";



export const CardsScreen = ({ navigation }) => {
    const [page, setPage] = useState(0)
    const [loading, setLoading] = useState(false)
    const [cards, setCards] = useState(null)
   const [cardTransactions, setCardTransactions] = useState(null)
   const [transactionsLoading, setTransactionsLoading] = useState(false)
   const [refreshing, setRefreshing] = React.useState(false);
   const [visible, setVisible] = React.useState(false);

    const { user, darkMode } = useContext(AuthContext)

    const CardBackground = styled.View`
    margin: auto;
    margin-top: 3px;
    margin-bottom: 3px;
    `;
    
    
    const HeaderButtonsWrapper = styled.View`
    flex-direction: row;
    padding: 13px;
    `;
    
    const HeaderButton1Wrapper = styled.View`
    
    `;
    
    const HeaderButton2Wrapper = styled.View`
    margin-left: auto;
    `;
    
    const CardWrapper = styled(Surface)`
    width: 320px;
    background-color: black;
    height: 210px;
    border-radius: 16px;
    `;
    
    const ImageChip = styled.Image.attrs({
      source: require("../../../images/chip.png")
    })`
    
    `;
    
    
    const Title = styled.Text`
    font-size: 24px;
    padding-left: 20px;
    padding-top: 10px;
    color: white;
    padding-bottom: 10px;
    `;
    
    const ChipWrapper = styled.View`
    padding-left: 20px;
    `;
    
    const CardNum = styled.Text`
    font-size: 26px;
    color: white;
    text-align: center;
    padding-top: 15px;
    `;
    
    const CardNumWrapper = styled.View`
    `;
    
    const ExpContainer = styled.View`
    padding-left: 22px;
    margin-top: 13px;
    `;
    
    const ExpTitle = styled.Text`
    font-size: 20px;
    padding-left: 20px;
    color: white;
    `;
    
    const NameCont = styled.View`
    padding-left: 20px;
    `;
    
    const NameTitle = styled.Text`
    font-size: 22px;
    color: white;
    `;
    
    const LogoContainer = styled.View`
    margin-left: auto;
    padding-right: 22px;
    
    `;
    
    
    const Header = styled.View`
    flex-direction: row;
    `;
    
    
    const ButtonsWrapper = styled.View`
    margin-top: 13px;
    flex-direction: row;
    justify-content: space-evenly;
    `;
    
    const ButtonContainer = styled.View`
    align-items: center;
    `;
    
    const ButtonText = styled.Text`
    font-size: 18px; 
    color: ${darkMode ? "white": "black"}
    `;
    
    const CardBalanceC = styled.View`
    justify-content: flex-end;
    align-items: flex-end;
    padding-right: 24px;
    margin-left: auto;
    `;
    
    const CardBalance = styled.Text`
    font-size: 26px;
    color: white;
    `;
    
    
    const LoadingWrapper = styled.View`
    margin: auto;
    justify-content: center;
    `;
    
    const NotFoundBackground = styled.View`
    width: 100%;
    height: 100%;
    background-color: white;
    align-items: center;
    `;
    
    const AnimationWrapper = styled.View`
    width: 100%;
    height: 60%
    `;
    
    const NoCardTitle = styled.Text`
    font-size: 23px;
    padding: 10px;
    font-family: ${(props) => props.theme.fonts.title};
    `;
    
    const InfoContainer = styled.View`
    justify-content: center;
    align-items: center;
    `;
    
    const Buton = styled(Button).attrs({
     
    })`
    width: 270px;
    font-size: 25px;
    background: ${(props) => props.theme.colors.ui.color}
    padding: 12px;
    margin-top: 10px;
    font-size: 26px;
    `;
    
    const Row  = styled.View`
    flex-direction: row;
    align-items: center;
    `;
    
    const ExpName = styled.Text`
    color: white;
    font-size: 18px;
    `;
    
    const ActivityTitle = styled.Text`
    font-size: 23px;
    font-weight: bold;
    padding-left: 33px;
    padding-top: 45px;
    color: ${darkMode ? "white": "black"};
    `;
    
    
    const TransactionCard = styled(List.Item)`
    font-family: ${(props) => props.theme.fonts.title};
    margin-top: 5px;
    margin-bottom: 5px;
    padding-left: 18px;
    `;

    const handleChangePage = (index) => {
       setPage(index)
       setVisible(!visible)
    }

    const Logo = styled.Image.attrs({
       source: cards && cards[page].brand === "Verve" ? require("../../../images/vervelogo.png") : require("../../../images/mastercardlogo.png"),
      })`
    `;

    async function refresh() {
      if(user.bridge_id) {
      try {
        const cardsReq = await fetch('https://api.hytello.com.ng/get-user-cards', {
          method: 'post',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            bridge_id: user.bridge_id
          })
        })

        const cardsData = await cardsReq.json()

        if(cardsReq.status === 200) {
          setRefreshing(false)
          setCards(cardsData)
        }else if(cardsReq.status === 404) {
          setCards([])
          setRefreshing(false)
        }

      }catch(error) {
        console.log(error)
        setRefreshing(false)
      }
    }else {
      setRefreshing(false)
    }
  
  }


    const onRefresh = React.useCallback(() => {
      setRefreshing(true);
      refresh()
    }, []);


 
    useEffect(() => {
      async function getCards() {
        if(user.bridge_id) {
        try {
          setLoading(true)
          const cardsReq = await fetch('https://api.hytello.com.ng/get-user-cards', {
            method: 'post',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({
              bridge_id: user.bridge_id
            })
          })
  
          const cardsData = await cardsReq.json()
  
          if(cardsReq.status === 200) {
            setLoading(false)
            setCards(cardsData)
            console.log(cardsData)
          }else if(cardsReq.status === 404) {
            setCards([])
            setLoading(false)
          }

        }catch(error) {
          console.log(error)
          setLoading(false)
        }
      }
    
    }

    getCards()
    }, [])

  
    useEffect(() => {
       async function getCardTransaction() {
        if(cards && cards.length >= 1) {
          setCardTransactions([])
        try {
          setTransactionsLoading(true)
          const transReq = await fetch('https://api.hytello.com.ng/card-transactions', {
            method: 'post',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({
              cardId: cards[page].card_id
            })
          })
  
          const transData = await transReq.json()
  
          if(transReq.status === 200) {
            setTransactionsLoading(false)
            setCardTransactions(transData)
            console.log(transReq.status)
            console.log(transData)
          }else if(transReq.status === 400) {
            setCardTransactions([])
            console.log(transData)
            setTransactionsLoading(false)
            Alert.alert(
              "Error",
              `${transData.message}`,
              [{ text: "Okay", onPress: () => null }],
              {
                cancelable: true,
              }
            )
          }else {
            console.log(transReq.status)
          }

        }catch(error) {
          console.log(error)
          setTransactionsLoading(false)
          
        }
      }
       }

       getCardTransaction()
    }, [page, cards])
  

 

    if(!user.bridge_id) {
      return <NoCardFoundScreen />
 }
    
    if(loading) {
      return <View style={{ flex: 1, backgroundColor: darkMode ? "#1A1A1A" : "white" }}>
         <ActivityIndicator color={"teal"} size={60} style={{ marginTop: '50%' }} />
      </View> 
    }
   
    if(!cards && !loading && user.bridge_id) {
         return <NoCardFoundScreen />
    }

  return (
    <Provider>
         {cards && !loading &&  (     
    <ScrollView style={{ flex: 1, paddingTop: 20, paddingBottom: 17, backgroundColor: darkMode ? "#1A1A1A" : "white" }} refreshControl={
      <RefreshControl
        refreshing={refreshing}
        onRefresh={onRefresh} />
      } >
    <Portal>
          <Dialog visible={visible} onDismiss={() => setVisible(!visible)}>
            <Dialog.Title>Select Card</Dialog.Title>
            <Dialog.Content>
           {cards && cards.map((card, index) => (
                <List.Item key={index} onPress={() => handleChangePage(index)}
                title={card.card_type === "virtual" ? "Virtual Card": "Physical"}
                 description={`${card.brand} $${card.balance}`}
                 />
           ))}
            </Dialog.Content>
          </Dialog>
        </Portal>    
      <HeaderButtonsWrapper>
      <HeaderButton1Wrapper>
        <Button mode="elevated" color={darkMode ? "white": "black"} onPress={() => setVisible(!visible)} size={25}>Cards</Button>
      </HeaderButton1Wrapper>
      <HeaderButton2Wrapper>
        <Button mode="contained-tonal"  color={darkMode ? "white": "black"} onPress={() => navigation.navigate("Create Card")} size={24}>Create a new card</Button>
      </HeaderButton2Wrapper>
    </HeaderButtonsWrapper>
     <CardBackground>
            <CardWrapper elevation={3} onPress={() => setIsToggled(!isToggled)}>
            <Row>
              <Title>Hytello</Title>
              <CardBalanceC>
                <CardBalance>${cards[page].balance}</CardBalance>
              </CardBalanceC>
            </Row>
            <CardNum>{cards[page].card_number}</CardNum>
            <Row>
              <ExpContainer>
               <ExpName>Expiry: <ExpTitle>{cards[page].expiry_month}/{cards[page].expiry_year}</ExpTitle></ExpName>
               <NameTitle>{cards[page].card_name}</NameTitle>
              </ExpContainer>
              <LogoContainer>
<Logo style={{ width: 80, height: 100, marginTop: 20}} resizeMode={cards && cards[page].brand === "Verve" ? "stretch" : "center"} />
</LogoContainer>
            </Row>
           </CardWrapper>
    </CardBackground>
    <ButtonsWrapper>
        <ButtonContainer>
        <IconButton
    icon="plus"
    color={darkMode ? "white": "black"}
    onPress={() => navigation.navigate("Fund Card", {
      cardId: cards[page].card_id
    })}
    mode="contained-tonal"
    size={37}
  />
    <ButtonText>Add</ButtonText>
        </ButtonContainer>
        <ButtonContainer>
        <IconButton
    icon="arrow-down-thin-circle-outline"
    mode="contained-tonal"
    color={darkMode ? "white": "black"}
    iconColor=""green
    onPress={() => navigation.navigate("Withdraw Card Funds", {
      cardBalance: cards[page].balance,
      cardId: cards[page].card_id
    })}
    size={37}
  />
    <ButtonText>Withdraw</ButtonText>
        </ButtonContainer>
        <ButtonContainer>
        <IconButton
    icon="details"
    mode="contained-tonal"
    color={darkMode ? "white": "black"}
    onPress={() =>navigation.navigate("View Card Details", {
      details: cards[page]
    })}
    size={37}
  />
    <ButtonText>Details</ButtonText>
        </ButtonContainer>
    </ButtonsWrapper>
    <ActivityTitle>Activity</ActivityTitle>
    <View style={{ padding: 14, paddingBottom: 35}}>
   {transactionsLoading && <ActivityIndicator color={darkMode ? "teal" : "teal"} size={25} /> }
    {cardTransactions && cardTransactions.length >=1 && !transactionsLoading && cardTransactions.map((t) => (
      <List.Item
      title={t.description}
      description={t.transaction_date}
      titleStyle={{ color: darkMode ? "white": "black"}}
      descriptionStyle={{ color: darkMode ? "gainsboro": "" }}
      right={props => <Text style={{ paddingTop: 15, fontSize: 18, color: t.card_transaction_type === "DEBIT" ? "red" : "green" }}>${t.amount}</Text>}
      />
    ))}
    {cardTransactions && cardTransactions.length === 0 && !transactionsLoading && <Text style={{  paddingTop: 15, fontSize: 18, color: darkMode ? "white" : "black"}}>No activity</Text>}
    </View>
     </ScrollView>
         )}
     </Provider>
  );
}

//

    {/* <List.Section style={{ marginTop: 30}}>
    <ScrollView>
    <List.Accordion
        title="Manage Card"
        expanded={expanded}
        onPress={() => setExpanded(!expanded)}
        theme={{ colors: { primary: '#52ab98'}}}
        left={props => <List.Icon {...props} icon="application-cog" />}>
        <List.Item onPress={() => navigation.navigate("View Card Pin", {
          cardid: cards[page]._id
        })} title="View Pin" />
        <List.Item onPress={() => navigation.navigate("Change Card Pin", {
          id: cards[page]._id
        })} title="Change Pin" />
        <List.Item onPress={() => navigation.navigate("Manage Card Controls", {
          card: cards[page]
        })} title="Card Control" />
           <List.Item onPress={() => navigation.navigate("View Card Details", {
          cardid: cards[page]._id
        })} title="View Card Details" />
           <List.Item onPress={() => navigation.navigate("Card Transactions", {
          cardid: cards[page]._id
        })} title="Card Transactions" />
        <List.Item onPress={() => navigation.navigate("Card Transactions", {
          cardid: cards[page]._id
        })} title="Card Transactions" />
      </List.Accordion>
      </ScrollView>
  </List.Section> */}