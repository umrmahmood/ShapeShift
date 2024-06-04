import React, { createContext, useState, useEffect } from "react";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { doc, setDoc, serverTimestamp } from "firebase/firestore";
import { fireDB } from "./Firebase.jsx";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);

  useEffect(() => {
    const auth = getAuth();
    const updateOnlineStatus = async (isOnline) => {
      if (currentUser) {
        const userRef = doc(fireDB, "users", currentUser.uid);
        await setDoc(
          userRef,
          { online: isOnline, lastOnline: serverTimestamp() },
          { merge: true }
        );
      }
    };

    const handleVisibilityChange = async () => {
      if (document.visibilityState === "hidden") {
        await updateOnlineStatus(false);
      } else {
        await updateOnlineStatus(true);
      }
    };

    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        setCurrentUser(user);
        await updateOnlineStatus(true);

        window.addEventListener("beforeunload", () =>
          updateOnlineStatus(false)
        );
        document.addEventListener("visibilitychange", handleVisibilityChange);

        return () => {
          window.removeEventListener("beforeunload", () =>
            updateOnlineStatus(false)
          );
          document.removeEventListener(
            "visibilitychange",
            handleVisibilityChange
          );
        };
      } else {
        setCurrentUser(null);
      }
    });

    return () => unsubscribe();
  }, [currentUser]);

  return (
    <AuthContext.Provider value={{ currentUser }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
