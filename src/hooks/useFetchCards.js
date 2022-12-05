import React, { useState, useEffect, useContext } from "react";
import { AuthContext } from "../services/authentication/auth.context";

export const useFetchCards = () => {
   const [cards, setCards] = useState(null)
   const [isCancelled, setIsCancelled] = useState(null)
   const [loading, setLoading] = useState(true)

   const { user } = useContext(AuthContext)

   const refreshUserCards = async () => {
      const options = {
         method: 'GET',
         headers: {
           accept: 'application/json',
           Authorization: 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MzE1NDNjOWI0YjMxZjg5ZTdkYTUwMTEiLCJlbWFpbEFkZHJlc3MiOiJhamFtaWVlbHVAZ21haWwuY29tIiwianRpIjoiNjM0MDRiYTNiNjgxMWY0ZGQ4NWJmN2M0IiwibWVtYmVyc2hpcCI6eyJfaWQiOiI2MzE1NDNjOWI0YjMxZjg5ZTdkYTUwMTQiLCJidXNpbmVzcyI6eyJfaWQiOiI2MzE1NDNjOWI0YjMxZjg5ZTdkYTUwMGYiLCJuYW1lIjoiSHl0ZWxsbyBOaWdlcmlhIEx0ZCIsImlzQXBwcm92ZWQiOnRydWV9LCJ1c2VyIjoiNjMxNTQzYzliNGIzMWY4OWU3ZGE1MDExIiwicm9sZSI6IkFQSUtleSJ9LCJpYXQiOjE2NjUxNTgwNTEsImV4cCI6MTY2NTc2Mjg1MX0.8vbVJA2gAfWe3Z73mB2U4TLUNN_dCHKlE29lR0OOpHw'
         }
       };
       
    try {
     setLoading(true)
     const res = await fetch(`https://api.sandbox.sudo.cards/cards/customer/${user.sudo_id}?page=0&limit=100`, options)
      const data = await res.json()
      if(data.data !== cards) {
         setCards(data.data)
         setLoading(false)
      }else {
         setLoading(false)
      }
    } catch(err){
      console.log(err)
      setLoading(false)
    }  
   }

   useEffect(() => {
     
   async function getCards() {
        const options = {
            method: 'GET',
            headers: {
              accept: 'application/json',
              Authorization: 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MzE1NDNjOWI0YjMxZjg5ZTdkYTUwMTEiLCJlbWFpbEFkZHJlc3MiOiJhamFtaWVlbHVAZ21haWwuY29tIiwianRpIjoiNjM0MDRiYTNiNjgxMWY0ZGQ4NWJmN2M0IiwibWVtYmVyc2hpcCI6eyJfaWQiOiI2MzE1NDNjOWI0YjMxZjg5ZTdkYTUwMTQiLCJidXNpbmVzcyI6eyJfaWQiOiI2MzE1NDNjOWI0YjMxZjg5ZTdkYTUwMGYiLCJuYW1lIjoiSHl0ZWxsbyBOaWdlcmlhIEx0ZCIsImlzQXBwcm92ZWQiOnRydWV9LCJ1c2VyIjoiNjMxNTQzYzliNGIzMWY4OWU3ZGE1MDExIiwicm9sZSI6IkFQSUtleSJ9LCJpYXQiOjE2NjUxNTgwNTEsImV4cCI6MTY2NTc2Mjg1MX0.8vbVJA2gAfWe3Z73mB2U4TLUNN_dCHKlE29lR0OOpHw'
            }
          };
          
      if(!isCancelled) {

       try {
        setLoading(true)
        const res = await fetch(`https://api.sandbox.sudo.cards/cards/customer/${user.sudo_id}?page=0&limit=100`, options)
         const data = await res.json()
         if(data.data !== cards) {
            setCards(data.data)
            console.log(data.data)
            setLoading(false)
         }else {
            setLoading(false)
         }
       } catch(err){
         console.log(err)
       }

       }
    }

    getCards()
 

    return () => setIsCancelled(true)
   }, [user])

    return { cards, loading, refreshUserCards }
}