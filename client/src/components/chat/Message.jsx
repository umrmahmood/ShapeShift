import React, { useEffect, useState, useContext, useRef } from "react";
import {
  collection,
  query,
  where,
  orderBy,
  onSnapshot,
  updateDoc,
  doc,
} from "firebase/firestore";
import { fireDB } from "../Firebase";
import AuthContext from "../AuthContext";
import "./bubbleStyle.css";

const Message = ({ conversationId }) => {
  const [messages, setMessages] = useState([]);
  const { currentUser } = useContext(AuthContext);
  const scrollRef = useRef(null);

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

      // Scroll to the most recent message
      if (scrollRef.current) {
        scrollRef.current.scrollIntoView({ behavior: "smooth" });
      }
    });

    return () => unsubscribe();
  }, [conversationId]);

  useEffect(() => {
    const updateReadStatus = async () => {
      const conversationRef = doc(fireDB, "conversations", conversationId);
      await updateDoc(conversationRef, {
        [`readStatus.${currentUser.uid}`]: true,
      });
    };
    updateReadStatus();
  }, [conversationId, messages, currentUser.uid]);

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
          <p className="status">
            {message.senderId === currentUser.uid
              ? message.readBy?.length > 1
                ? "Read"
                : "Sent"
              : ""}
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
      <div ref={scrollRef}></div>
    </div>
  );
};

export default Message;
