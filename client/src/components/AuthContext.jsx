import React, { createContext, useState, useEffect } from "react";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { doc, setDoc, serverTimestamp } from "firebase/firestore";
import { fireDB } from "./Firebase.jsx";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);

  useEffect(() => {
    const auth = getAuth();
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        const userRef = doc(fireDB, "users", user.uid);
        await setDoc(
          userRef,
          { online: true, lastOnline: serverTimestamp() },
          { merge: true }
        );

        setCurrentUser(user);

        window.addEventListener("beforeunload", async () => {
          await setDoc(
            userRef,
            { online: false, lastOnline: serverTimestamp() },
            { merge: true }
          );
        });

        const idleCallback = async () => {
          await setDoc(
            userRef,
            { online: false, lastOnline: serverTimestamp() },
            { merge: true }
          );
        };

        document.addEventListener("visibilitychange", idleCallback);

        return () => {
          document.removeEventListener("visibilitychange", idleCallback);
          window.removeEventListener("beforeunload", async () => {
            await setDoc(
              userRef,
              { online: false, lastOnline: serverTimestamp() },
              { merge: true }
            );
          });
        };
      } else {
        setCurrentUser(null);
      }
    });

    return () => unsubscribe();
  }, []);

  return (
    <AuthContext.Provider value={{ currentUser }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
