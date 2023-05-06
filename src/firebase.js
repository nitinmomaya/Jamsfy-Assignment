// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {
  getAuth,
  createUserWithEmailAndPassword,
  updateProfile,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut,
  signInWithPopup,
  GoogleAuthProvider,
} from "firebase/auth";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDBHY9lJryRZRxaXRrA9_vKSgiTWGN0um4",
  authDomain: "jamsfy-assignment-fcf31.firebaseapp.com",
  projectId: "jamsfy-assignment-fcf31",
  storageBucket: "jamsfy-assignment-fcf31.appspot.com",
  messagingSenderId: "980841704660",
  appId: "1:980841704660:web:405826c92d56235a8bdf41",
};
// Initialize Firebase
const app = initializeApp(firebaseConfig);

// your firebase config here

//init firebase app
initializeApp(firebaseConfig);

//init services
const auth = getAuth();

export {
  auth,
  createUserWithEmailAndPassword,
  updateProfile,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut,
  signInWithPopup,
  GoogleAuthProvider,
};

export default app;
