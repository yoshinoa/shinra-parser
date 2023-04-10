import styles from "@/styles/Home.module.css";
import { useState } from "react";
import { parser_login } from "@/firebase/auth";
import { useRouter } from "next/navigation";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const router = useRouter();

  const handleSubmit = (e) => {
    e.preventDefault();

    parser_login(email, password)
      .then((userCredential) => {
        // Signed in
        const user = userCredential.user;
        // ...
        router.push("/home");
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        if (errorCode === "auth/wrong-password") {
          setError("Wrong password.");
        }
        if (errorCode === "auth/user-not-found") {
          setError("User not found.");
        }
        if (errorCode === "auth/invalid-email") {
          setError("Invalid email.");
        }
        console.log(errorCode, errorMessage);
      });
  };

  return (
    <div className={styles.container}>
      <main className={styles.main}>
        <h1 className={styles.title}>Welcome to Shinra Parser!</h1>
        <p className={styles.description}>Sign in to get started</p>
        <input
          type="text"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        {error && <p>{error}</p>}
        <button type="submit" onClick={handleSubmit}>
          Sign in
        </button>
      </main>
    </div>
  );
}
