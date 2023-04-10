import { useState, useEffect } from "react";
import { auth } from "@/firebase/firebase";
import { useRouter } from "next/navigation";
import styles from "@/styles/Home.module.css";

export default function Home() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

  useEffect(() => {
    if (auth.currentUser) {
      router.push("/home");
    } else {
      router.push("/login");
    }
  }, []);

  return <div className={styles.container}></div>;
}
