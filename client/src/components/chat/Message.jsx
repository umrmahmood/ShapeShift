import React, { useEffect, useState, useContext, useRef } from "react";
import {
  collection,
  query,
  where,
  orderBy,
  onSnapshot,
  updateDoc,
  doc,
  getDoc,
  getDocs,
} from "firebase/firestore";
import { fireDB } from "../Firebase.jsx";
import AuthContext from "../AuthContext.jsx";
import "./bubbleStyle.css";

const Message = ({ conversationId, scrollRef }) => {
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

  useEffect(() => {
    const updateReadStatus = async () => {
      const conversationRef = doc(fireDB, "conversations", conversationId);
      const conversationDoc = await getDoc(conversationRef);

      if (conversationDoc.exists) {
        const readStatus = conversationDoc.data().readStatus || {};

        if (!readStatus[currentUser.uid]) {
          console.log(`Updating read status for user ${currentUser.uid}`);
          await updateDoc(conversationRef, {
            [`readStatus.${currentUser.uid}`]: true,
          });

          // Update readBy field in each message
          const messagesRef = collection(fireDB, "messages");
          const messagesQuery = query(
            messagesRef,
            where("conversationId", "==", conversationId)
          );
          const messageSnapshots = await getDocs(messagesQuery);

          messageSnapshots.forEach(async (messageDoc) => {
            if (!messageDoc.data().readBy.includes(currentUser.uid)) {
              const messageRef = doc(fireDB, "messages", messageDoc.id);
              await updateDoc(messageRef, {
                readBy: [...messageDoc.data().readBy, currentUser.uid],
              });
            }
          });
        }
      }
    };

    if (messages.length > 0) {
      updateReadStatus();
    }
  }, [conversationId, messages, currentUser.uid]);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages]);

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
          <div className="timestamp-status-wrapper">
            <p className="timestamp">
              {new Date(message.timestamp?.toDate()).toLocaleTimeString([], {
                hour: "2-digit",
                minute: "2-digit",
                hour12: true,
              })}
            </p>
            <p className="status">
              {message.senderId === currentUser.uid
                ? message.readBy.includes(message.recipientId)
                  ? "Read"
                  : "Sent"
                : ""}
            </p>
          </div>
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
