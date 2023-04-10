import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSignOut } from "@fortawesome/free-solid-svg-icons";
import { parser_logout } from "@/firebase/auth";
import { useRouter } from "next/router";
import { auth } from "@/firebase/firebase";

export default function LogoutButton() {
  const router = useRouter();
  const signOut = async () => {
    try {
      parser_logout().then(() => {
        router.push("/login");
      });
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <button
      onClick={signOut}
      style={{
        border: "none",
        backgroundColor: "transparent",
        cursor: "pointer",
      }}
    >
      <FontAwesomeIcon
        icon={faSignOut}
        style={{ backgroundColor: "#2a3f54", color: "#fff", padding: "10px" }}
      />
    </button>
  );
}
