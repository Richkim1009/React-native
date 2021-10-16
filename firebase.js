// Import the functions you need from the SDKs you need
import * as firebase from "firebase";
//import '@firebase/messaging';


// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyC1LHG01AYP8vKlZnAt9MQa-8GbQgIk89U",
  authDomain: "gaja-327502.firebaseapp.com",
  databaseURL: "https://gaja-327502-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "gaja-327502",
  storageBucket: "gaja-327502.appspot.com",
  messagingSenderId: "894484312855",
  appId: "1:894484312855:web:040146bc68ab6ee3507d52",
  measurementId: "G-4H8EGCGEGY"
};

// Initialize Firebase
let app;
if(firebase.apps.length === 0) {
  app = firebase.initializeApp(firebaseConfig);
} else {
  app = firebase.app();
}

const auth = firebase.auth();
const database = firebase.database();
const ref = firebase.storage().ref();

export { auth };
export { database };
export { ref };
export { firebaseConfig };

