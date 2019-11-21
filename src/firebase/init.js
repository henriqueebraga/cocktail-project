import firebase from 'firebase'
import firestore from 'firebase/firestore'

// Your web app's Firebase configuration
var firebaseConfig = {
    apiKey: "AIzaSyAngLubFT1mP_aQg-lC4Ah5vSLqM4kYXDk",
    authDomain: "drinks-project-f0da8.firebaseapp.com",
    databaseURL: "https://drinks-project-f0da8.firebaseio.com",
    projectId: "drinks-project-f0da8",
    storageBucket: "drinks-project-f0da8.appspot.com",
    messagingSenderId: "831797877134",
    appId: "1:831797877134:web:88897171f89e79ff8c6cdf",
    measurementId: "G-LN6E99SNGB"
  };
  // Initialize Firebase
  const firebaseApp = firebase.initializeApp(firebaseConfig);
  firebase.analytics();

  export default firebaseApp.firestore()