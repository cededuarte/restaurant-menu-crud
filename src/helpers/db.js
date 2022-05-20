import firebase from 'firebase';

const firebaseConfig = {
    apiKey: "AIzaSyDN_WdQ8uNKr0YxyszTEtpEgBCnwC2G6a4",
    authDomain: "restaurant-menu-crud.firebaseapp.com",
    databaseURL: "https://restaurant-menu-crud-default-rtdb.firebaseio.com",
    projectId: "restaurant-menu-crud",
    storageBucket: "restaurant-menu-crud.appspot.com",
    messagingSenderId: "847039201668",
    appId: "1:847039201668:web:8bb429645a591b84461dd1"
  };
  
  // Initialize Firebase
  const fire = firebase.initializeApp(firebaseConfig);

  export default fire;