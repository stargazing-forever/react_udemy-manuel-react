import firebase from "firebase/app";
import "firebase/firestore"
// Your web app's Firebase configuration
  // For Firebase JS SDK v7.20.0 and later, measurementId is optional
  const firebaseConfig = {
    apiKey: "AIzaSyANL9h8Z7qQRlWZtMb1aqzNbpgYyKR8o-M",
    authDomain: "react-firebase-e4a97.firebaseapp.com",
    projectId: "react-firebase-e4a97",
    storageBucket: "react-firebase-e4a97.appspot.com",
    messagingSenderId: "499042498675",
    appId: "1:499042498675:web:6fdf11efbbd6e71d905206",
    measurementId: "G-TGLZE887GF"
  };
  // Initialize Firebase
  const fireb = firebase.initializeApp(firebaseConfig);
  const store = fireb.firestore();

  export {store};