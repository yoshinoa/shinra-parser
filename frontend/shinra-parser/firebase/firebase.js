// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";
import { getFunctions } from "firebase/functions";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyB0E4UrB6aUQJE-_D1qJRkwlsx6yOqnIeY",
  authDomain: "shinra-parser.firebaseapp.com",
  projectId: "shinra-parser",
  storageBucket: "shinra-parser.appspot.com",
  messagingSenderId: "697993117449",
  appId: "1:697993117449:web:0ccff6203dcaa0430d5dd8",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const db = getStorage(app);
export const auth = getAuth(app);
export const functions = getFunctions(app);
