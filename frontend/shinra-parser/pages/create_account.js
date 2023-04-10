import styles from "@/styles/Home.module.css";
import { useState } from "react";
import { parser_signup } from "@/firebase/auth";
import { useRouter } from "next/navigation";

export default function CreateAccount() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState(null);

  const router = useRouter();
  const handleSubmit = (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    parser_signup(email, password)
      .then((userCredential) => {
        // Signed up
        const user = userCredential.user;
        console.log("signed up");
        // ...
        router.push("/index");
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        if (errorCode === "auth/weak-password") {
          setError("Password is too weak.");
        }
        if (errorCode === "auth/email-already-in-use") {
          setError("Email already in use.");
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
        <p className={styles.description}>Create an account.</p>
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
        <input
          type="password"
          placeholder="Confirm Password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
        />
        {error && <p>{error}</p>}
        <button type="submit" onClick={handleSubmit}>
          Sign up
        </button>
      </main>
    </div>
  );
}
