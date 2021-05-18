import firebase from 'firebase'

var config = {
  apiKey: "AIzaSyDH9A8S5CDzNR01Mb8po0Th4_Hx3UOSJDM",
  authDomain: "search-gala.firebaseapp.com",
  databaseURL: "https://search-gala-default-rtdb.firebaseio.com",
  projectId: "search-gala",
  storageBucket: "search-gala.appspot.com",
  messagingSenderId: "688897172002",
  appId: "1:688897172002:web:8aaf04830b499daa58a07b"
};
  // Initialize Firebase
  firebase.initializeApp(config);

  export default firebase;