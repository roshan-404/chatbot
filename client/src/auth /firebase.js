import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';
import 'firebase/analytics';


firebase.initializeApp({
    apiKey: "AIzaSyBUxkRwZj16aHKCRaPxPVcFZCVVNVYupFI",
    authDomain: "chat-bot-assignment.firebaseapp.com",
    projectId: "chat-bot-assignment",
    storageBucket: "chat-bot-assignment.appspot.com",
    messagingSenderId: "799007722413",
    appId: "1:799007722413:web:36391ec7ebf8145b1b2f24",
    measurementId: "G-F96JK718FF"
})

const auth = firebase.auth();
const analytics = firebase.analytics();

export {auth , analytics}; 