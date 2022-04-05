import firebase from 'firebase'
const firebaseConfig = {
    apiKey: "AIzaSyBO06yI2qwdw-iWUf1l6ykkYqQYQMTI6Eo",
    authDomain: "courses-e3e2f.firebaseapp.com",
    projectId: "courses-e3e2f",
    storageBucket: "courses-e3e2f.appspot.com",
    messagingSenderId: "199148515113",
    appId: "1:199148515113:web:f2622667ae62fab0e71138"
  };
  // Initialize Firebase
  const appFire = firebase.initializeApp(firebaseConfig);
  export default appFire;