import React, { useEffect, useState, useContext } from "react";
import {
  collection,
  query,
  where,
  orderBy,
  onSnapshot,
} from "firebase/firestore";
import { fireDB } from "../Firebase.jsx";
import AuthContext from "../AuthContext.jsx";
import "./chatStyle.css";

const Message = ({ conversationId }) => {
  const [messages, setMessages] = useState([]);
  const { currentUser } = useContext(AuthContext);

  useEffect(() => {
    const messagesRef = collection(fireDB, "messages");
    const messagesQuery = query(
      messagesRef,
      where("conversationId", "==", conversationId),
      orderBy("timestamp")
    );

    const unsubscribe = onSnapshot(messagesQuery, (snapshot) => {
      const messageList = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setMessages(messageList);
    });

    return () => unsubscribe();
  }, [conversationId]);

  return (
    <div className="message-container">
      {messages.map((message) => (
        <div
          key={message.id}
          className={`message ${
            message.senderId === currentUser.uid ? "sent" : "received"
          }`}
        >
          <p>{message.displayName}</p>
          <p>{message.message}</p>
        </div>
      ))}
    </div>
  );
};

export default Message;
