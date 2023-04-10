import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { auth } from "@/firebase/firebase";

const withAuth = (Component) => {
  const AuthenticatedComponent = (props) => {
    const router = useRouter();
    const [user, setUser] = useState(null);

    useEffect(() => {
      const unsubscribe = auth.onAuthStateChanged((currentUser) => {
        if (currentUser) {
          setUser(currentUser);
        } else {
          router.push("/login");
        }
      });

      return () => unsubscribe();
    }, []);

    return user ? <Component {...props} /> : null;
  };

  return AuthenticatedComponent;
};

export default withAuth;
