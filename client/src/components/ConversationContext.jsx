import React, { createContext, useState, useEffect, useContext } from "react";
import { collection, onSnapshot, query, where } from "firebase/firestore";
import { fireDB } from "./Firebase.jsx";
import AuthContext from "./AuthContext.jsx";

const ConversationContext = createContext();

export const ConversationProvider = ({ children }) => {
  const { currentUser } = useContext(AuthContext);
  const [conversations, setConversations] = useState([]);

  useEffect(() => {
    const unsubscribe = () => {};

    if (currentUser) {
      const conversationsQuery = query(
        collection(fireDB, "conversations"),
        where("participantIds", "array-contains", currentUser.uid)
      );

      const unsubscribeConversations = onSnapshot(
        conversationsQuery,
        (querySnapshot) => {
          const conversationList = querySnapshot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data(),
          }));

          setConversations(conversationList);
        }
      );

      unsubscribe = unsubscribeConversations;
    }

    return unsubscribe;
  }, [currentUser]);

  return (
    <ConversationContext.Provider value={{ conversations }}>
      {children}
    </ConversationContext.Provider>
  );
};

export default ConversationContext;
