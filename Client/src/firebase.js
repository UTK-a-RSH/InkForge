// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "inkforge-657bc.firebaseapp.com",
  projectId: "inkforge-657bc",
  storageBucket: "inkforge-657bc.appspot.com",
  messagingSenderId: "348083637567",
  appId: "1:348083637567:web:18e3ce423f93ff8303178a"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);