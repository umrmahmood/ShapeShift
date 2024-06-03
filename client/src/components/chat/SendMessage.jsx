import React, { useState, useContext, useEffect } from "react";
import { auth, fireDB } from "../Firebase";
import {
  addDoc,
  collection,
  doc,
  serverTimestamp,
  updateDoc,
  setDoc,
  getDoc,
  query,
  where,
  getDocs,
} from "firebase/firestore";
import AuthContext from "../AuthContext";
import axios from "axios";
import { jwtDecode } from "jwt-decode";
import "./chatStyle.css";

const SendMessage = ({ scroll, recipientId, conversationId }) => {
  const [message, setMessage] = useState("");
  const [recipientDisplayName, setRecipientDisplayName] = useState("");
  const [username, setUsername] = useState("");
  const { currentUser } = useContext(AuthContext);

  useEffect(() => {
    const fetchRecipientDisplayName = async () => {
      if (conversationId) {
        const conversationDocRef = doc(fireDB, "conversations", conversationId);
        const conversationDocSnapshot = await getDoc(conversationDocRef);
        if (conversationDocSnapshot.exists()) {
          const conversationData = conversationDocSnapshot.data();
          const participant = conversationData.participants.find(
            (participant) => participant.uid === recipientId
          );
          if (participant) {
            setRecipientDisplayName(participant.displayName);
          }
        }
      }
    };
    fetchRecipientDisplayName();
  }, [conversationId, recipientId]);

  useEffect(() => {
    const tokenFromLocalStorage = localStorage.getItem("shapeshiftkey");
    if (tokenFromLocalStorage) {
      const decodedToken = jwtDecode(tokenFromLocalStorage);
      try {
        setUsername(decodedToken.userName);
      } catch (error) {
        console.error("Error fetching user information:", error);
      }
    } else {
      console.log("Token not found in localStorage");
    }
  }, []);

  useEffect(() => {
    const userTypingRef = doc(fireDB, "users", currentUser.uid);
    const updateTypingStatus = async (typing) => {
      const userDoc = await getDoc(userTypingRef);
      if (!userDoc.exists()) {
        await setDoc(userTypingRef, {
          uid: currentUser.uid,
          displayName: username, // use fetched username
          typing: typing,
          lastOnline: serverTimestamp(),
        });
      } else {
        await updateDoc(userTypingRef, {
          typing: typing,
          lastOnline: serverTimestamp(),
        });
      }
    };
    if (message) {
      updateTypingStatus(true);
    } else {
      updateTypingStatus(false);
    }
    return () => updateTypingStatus(false);
  }, [message, currentUser.uid, username]);

  const sendMessage = async (event) => {
    event.preventDefault();
    if (message.trim() === "") {
      alert("Enter a valid message");
      return;
    }
    const { uid } = auth.currentUser;
    let convId = conversationId;
    if (!conversationId) {
      const existingConversationQuery = query(
        collection(fireDB, "conversations"),
        where("participantIds", "array-contains", uid)
      );
      const existingConversationSnapshot = await getDocs(
        existingConversationQuery
      );
      const existingConversation = existingConversationSnapshot.docs.find(
        (doc) => doc.data().participantIds.includes(recipientId)
      );
      if (!existingConversation) {
        const newConversationRef = doc(collection(fireDB, "conversations"));
        await setDoc(newConversationRef, {
          documentId: newConversationRef.id,
          initiatedAt: serverTimestamp(),
          initiatedBy: uid,
          lastMessage: {
            message,
            senderId: uid,
            timestamp: serverTimestamp(),
          },
          lastUpdatedAt: serverTimestamp(),
          participants: [
            { uid, displayName: username },
            { uid: recipientId, displayName: recipientDisplayName },
          ],
          participantIds: [uid, recipientId],
          readStatus: { [uid]: true, [recipientId]: false },
        });
        convId = newConversationRef.id;
      } else {
        convId = existingConversation.id;
      }
    }
    const messagesCollectionRef = collection(fireDB, "messages");
    await addDoc(messagesCollectionRef, {
      conversationId: convId,
      message,
      senderId: uid,
      senderDisplayName: username, // use fetched username
      recipientId,
      status: "sent",
      timestamp: serverTimestamp(),
      readBy: [uid], // Initialize with sender's uid
    });
    const conversationRef = doc(fireDB, "conversations", convId);
    await updateDoc(conversationRef, {
      lastMessage: { message, senderId: uid, timestamp: serverTimestamp() },
      lastUpdatedAt: serverTimestamp(),
      [`readStatus.${recipientId}`]: false,
    });
    console.log("Message sent:", message);
    setMessage("");
    if (scroll && scroll.current) {
      scroll.current.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <form onSubmit={sendMessage} className="send-message">
      <label htmlFor="messageInput" hidden>
        Enter Message
      </label>
      <input
        id="messageInput"
        name="messageInput"
        type="text"
        className="form-input__input"
        placeholder={`Message ${recipientDisplayName}`}
        value={message}
        onChange={(e) => setMessage(e.target.value)}
      />
      <button className="custom-button" type="submit">
        Send
      </button>
    </form>
  );
};

export default SendMessage;
