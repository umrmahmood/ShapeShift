import React, { createContext, useState, useEffect, useContext } from "react";
import { collection, query, where, onSnapshot } from "firebase/firestore";
import { fireDB } from "./Firebase.jsx";
import AuthContext from "./AuthContext.jsx";

const NotificationContext = createContext();

export const NotificationProvider = ({ children }) => {
  const [unreadMessages, setUnreadMessages] = useState(false);
  const { currentUser } = useContext(AuthContext);

  useEffect(() => {
    if (!currentUser) return;

    const { uid } = currentUser;

    const conversationsQuery = query(
      collection(fireDB, "conversations"),
      where("participantIds", "array-contains", uid)
    );

    const unsubscribe = onSnapshot(conversationsQuery, (snapshot) => {
      let hasUnreadMessages = false;

      snapshot.docs.forEach((doc) => {
        const data = doc.data();
        if (!data.readStatus[uid]) {
          hasUnreadMessages = true;
        }
      });

      setUnreadMessages(hasUnreadMessages);
    });

    return () => unsubscribe();
  }, [currentUser]);

  return (
    <NotificationContext.Provider value={{ unreadMessages, setUnreadMessages }}>
      {children}
    </NotificationContext.Provider>
  );
};

export default NotificationContext;
