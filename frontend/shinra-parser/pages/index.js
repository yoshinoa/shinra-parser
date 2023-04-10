import styles from "@/styles/Home.module.css";
import { useState } from "react";
import { auth } from "@/firebase/firebase";
import { useRouter } from "next/navigation";

export default function Home() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();
  auth.onAuthStateChanged((user) => {
    if (user) {
      // User is signed in, see docs for a list of available properties
      // https://firebase.google.com/docs/reference/js/firebase.User
      const uid = user.uid;
      // ...
      router.push("/home");
    } else {
      // User is signed out
      // ...
      router.push("/login");
    }
  });

  return (
    <div className={styles.container}>
      <main className={styles.main}>
        <h1 className={styles.title}>Welcome to Shinra Parser!</h1>
        <p className={styles.description}>Sign in to get started</p>
      </main>
    </div>
  );
}
