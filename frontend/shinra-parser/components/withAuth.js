import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { auth } from "@/firebase/firebase";
const withAuth = (Component) => {
  const AuthenticatedComponent = (props) => {
    const router = useRouter();
    const [user, setUser] = useState(null);

    useEffect(() => {
      if (!auth.currentUser) {
        router.push("/login");
      } else {
        setUser(auth.currentUser);
      }
    }, []);

    return user ? <Component {...props} /> : null;
  };

  return AuthenticatedComponent;
};

export default withAuth;
