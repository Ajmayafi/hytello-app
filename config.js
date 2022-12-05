import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyBgrfJt6HHXppXuOhDG8LTTUyV-4GLd264",
    authDomain: "hytello.firebaseapp.com",
    projectId: "hytello",
    storageBucket: "hytello.appspot.com",
    messagingSenderId: "757748275205",
    appId: "1:757748275205:web:2a5dce10d8a24e68a8246c"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);


export const auth = getAuth(app);
export const db = getFirestore(app);