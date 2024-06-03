// AuthContext.jsx

import React, { createContext, useState, useEffect } from "react";
import { auth, fireDB } from "./Firebase.jsx";
import { doc, setDoc, serverTimestamp } from "firebase/firestore";

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);

  useEffect(() => {
    const setOnlineStatus = async (user) => {
      if (user) {
        const userRef = doc(fireDB, "users", user.uid);
        await setDoc(
          userRef,
          { online: true, lastOnline: serverTimestamp() },
          { merge: true }
        );

        // Set offline status when the user disconnects
        const onDisconnectRef = userRef;
        await setDoc(
          onDisconnectRef,
          { online: false, lastOnline: serverTimestamp() },
          { merge: true }
        );
      }
    };

    const unsubscribe = auth.onAuthStateChanged((user) => {
      setCurrentUser(user);
      if (user) {
        setOnlineStatus(user);
      }
    });

    return () => {
      unsubscribe();
      if (currentUser) {
        const userRef = doc(fireDB, "users", currentUser.uid);
        setDoc(
          userRef,
          { online: false, lastOnline: serverTimestamp() },
          { merge: true }
        );
      }
    };
  }, [currentUser]);

  return (
    <AuthContext.Provider value={{ currentUser }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
