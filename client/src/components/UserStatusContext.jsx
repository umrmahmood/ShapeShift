import React, { createContext, useState, useEffect, useContext } from "react";
import { doc, onSnapshot, setDoc, serverTimestamp } from "firebase/firestore";
import { fireDB } from "./Firebase.jsx";
import AuthContext from "./AuthContext.jsx";

const UserStatusContext = createContext();

export const UserStatusProvider = ({ children }) => {
  const { currentUser } = useContext(AuthContext);
  const [userStatus, setUserStatus] = useState({});

  useEffect(() => {
    const updateUserStatus = async (userId, isOnline) => {
      try {
        const userRef = doc(fireDB, "users", userId);
        await setDoc(
          userRef,
          {
            online: isOnline,
            lastOnline: serverTimestamp(),
          },
          { merge: true }
        );
      } catch (error) {
        console.error("Error updating user status:", error);
      }
    };

    const handleVisibilityChange = async () => {
      if (currentUser) {
        if (document.visibilityState === "hidden") {
          await updateUserStatus(currentUser.uid, false);
        } else {
          await updateUserStatus(currentUser.uid, true);
        }
      }
    };

    const unsubscribeUserStatus = () => {};

    if (currentUser) {
      const unsubscribe = onSnapshot(
        doc(fireDB, "users", currentUser.uid),
        (doc) => {
          if (doc.exists()) {
            setUserStatus((prevUserStatus) => ({
              ...prevUserStatus,
              [currentUser.uid]: doc.data().online,
            }));
          } else {
            setUserStatus((prevUserStatus) => ({
              ...prevUserStatus,
              [currentUser.uid]: false,
            }));
          }
        }
      );

      unsubscribeUserStatus = unsubscribe;

      window.addEventListener("beforeunload", () =>
        updateUserStatus(currentUser.uid, false)
      );
      document.addEventListener("visibilitychange", handleVisibilityChange);
    }

    return () => {
      unsubscribeUserStatus();
      window.removeEventListener("beforeunload", () =>
        updateUserStatus(currentUser.uid, false)
      );
      document.removeEventListener("visibilitychange", handleVisibilityChange);
    };
  }, [currentUser]);

  return (
    <UserStatusContext.Provider value={{ userStatus }}>
      {children}
    </UserStatusContext.Provider>
  );
};

export default UserStatusContext;
