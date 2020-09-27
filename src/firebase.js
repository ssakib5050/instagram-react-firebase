import firebase from "firebase";

const firebaseConfig = firebase.initializeApp({
  apiKey: "AIzaSyBTjJTXdE27UUic6Y7bC_uqvovZLvp_Rfs",
  authDomain: "instagram-react-firebase-a25ec.firebaseapp.com",
  databaseURL: "https://instagram-react-firebase-a25ec.firebaseio.com",
  projectId: "instagram-react-firebase-a25ec",
  storageBucket: "instagram-react-firebase-a25ec.appspot.com",
  messagingSenderId: "349565131786",
  appId: "1:349565131786:web:fb4a3a7c9f959e6d9253f3",
  measurementId: "G-9ZXH2JVZW9",
});

const db = firebase.firestore();
const storage = firebase.storage();

export { db, storage };
