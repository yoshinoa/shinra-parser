import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";
import { auth } from "./firebase";
import { useRouter } from "next/router";

export function parser_signup(email, password) {
  return createUserWithEmailAndPassword(auth, email, password);
}

export function parser_login(email, password) {
  return signInWithEmailAndPassword(auth, email, password);
}

export function parser_logout() {
  return signOut(auth);
}

export function setupAuthStateListener() {
  const router = useRouter();
  auth.onAuthStateChanged((user) => {
    if (user) {
      console.log("ran");
      router.push("/home");
    } else {
      console.log("ran");
      router.push("/login");
    }
  });
}
