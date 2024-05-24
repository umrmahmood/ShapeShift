import React, { useEffect, useState, useContext } from "react";
import {
  collection,
  query,
  where,
  orderBy,
  onSnapshot,
} from "firebase/firestore";
import { fireDB } from "../Firebase";
import AuthContext from "../AuthContext";
import "./bubbleStyle.css";

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
    <div className="chat-container">
      {messages.map((message) => (
        <div
          key={message.id}
          className={`bubble ${
            message.senderId === currentUser.uid ? "right" : "left"
          }`}
        >
          <p className="sender-name">{message.senderDisplayName}</p>
          <p className="message-text">{message.message}</p>
          <p className="timestamp">
            {new Date(message.timestamp?.toDate()).toLocaleTimeString()}
          </p>
          <div
            className={
              message.senderId === currentUser.uid
                ? "right-arrow"
                : "left-arrow"
            }
          ></div>
          <div
            className={
              message.senderId === currentUser.uid
                ? "right-arrow-overlap"
                : "left-arrow-overlap"
            }
          ></div>
        </div>
      ))}
    </div>
  );
};

export default Message;
