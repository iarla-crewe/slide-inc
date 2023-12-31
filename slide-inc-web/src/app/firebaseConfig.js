// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getDatabase } from "@firebase/database";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
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
const app = initializeApp(firebaseConfig);
export const database = getDatabase(app)



// export {database}