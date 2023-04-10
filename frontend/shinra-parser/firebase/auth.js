import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { auth } from "./firebase";

export function parser_signup(email, password) {
  return createUserWithEmailAndPassword(auth, email, password);
}

export function parser_login(email, password) {
  console.log(auth);
  console.log(email, password);
  return signInWithEmailAndPassword(auth, email, password);
}
