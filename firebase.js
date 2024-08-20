// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import {getFirebase} from "firebase/firestore"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAseAircHCDiWJxS51KN4vVxuH-VVysp_Y",
  authDomain: "flashcardsass-62ace.firebaseapp.com",
  projectId: "flashcardsass-62ace",
  storageBucket: "flashcardsass-62ace.appspot.com",
  messagingSenderId: "925533479386",
  appId: "1:925533479386:web:2179524356c402949c20e3",
  measurementId: "G-WSSC63TYJ1"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const db = getFirebase(app);
export{db}