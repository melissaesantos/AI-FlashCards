// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore"; // Correct import for Firestore
import { getAnalytics, isSupported } from "firebase/analytics";

// Your web app's Firebase configuration
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

// Initialize Firestore
const db = getFirestore(app);

// Initialize Analytics if supported
let analytics;
if (typeof window !== "undefined" && isSupported()) {
  analytics = getAnalytics(app);
}

export { db, analytics };
