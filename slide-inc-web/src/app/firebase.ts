import { getApps, getApp, initializeApp } from "firebase/app";
import {  getAuth } from "firebase/auth"

const firebaseConfig = {
  apiKey: "AIzaSyCvSE7MOX3ER4hCAmyQEHsPWYkVKpFsnqo",
  authDomain: "health-ai-9e1c9.firebaseapp.com",
  databaseURL: "https://health-ai-9e1c9-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "health-ai-9e1c9",
  storageBucket: "health-ai-9e1c9.appspot.com",
  messagingSenderId: "590799317593",
  appId: "1:590799317593:web:71091fb21dfc919099df48",
  measurementId: "G-T69JKPL5JS"
};

// Initialize Firebase
const app = getApps().length ? getApp() : initializeApp(firebaseConfig);
const auth = getAuth()

export {app, auth}