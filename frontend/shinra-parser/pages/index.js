import { useState } from "react";
import { auth } from "@/firebase/firebase";
import { useRouter } from "next/navigation";

export default function Home() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

  return (
    <div className={styles.container}>
      <main className={styles.main}>
        <h1 className={styles.title}>Welcome to Lumber!</h1>
        <p className={styles.description}>Sign in to get started</p>
      </main>
    </div>
  );
}
