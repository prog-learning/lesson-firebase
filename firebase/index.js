import firebase from 'firebase/app';
import "firebase/firestore";
import "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyCmkgbE4FRaDdPIqjL9zHhYYwa6F1zxQqA",
  authDomain: "lesson-firebase-e03ab.firebaseapp.com",
  projectId: "lesson-firebase-e03ab",
  storageBucket: "lesson-firebase-e03ab.appspot.com",
  messagingSenderId: "508930306099",
  appId: "1:508930306099:web:5c42e8fdd50b689661b346",
};

if (firebase.apps.length === 0) {
  firebase.initializeApp(firebaseConfig);
}

export const db = firebase.firestore();
export default firebase;
