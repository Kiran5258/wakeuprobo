// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASEAPIKEY,
  authDomain: "wakeuprobo.firebaseapp.com",
  projectId: "wakeuprobo",
  storageBucket: "wakeuprobo.firebasestorage.app",
  messagingSenderId: "401155861963",
  appId: "1:401155861963:web:655c2ce0463a08d5c91a4e"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);