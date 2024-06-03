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
import "./chatStyle.css";

const SendMessage = ({ scroll, recipientId, conversationId }) => {
  const [message, setMessage] = useState("");
  const { currentUser } = useContext(AuthContext);
  const [recipientDisplayName, setRecipientDisplayName] = useState("");

  useEffect(() => {
    const fetchRecipientDisplayName = async () => {
      const recipientDocRef = doc(fireDB, "users", recipientId);
      const recipientDocSnapshot = await getDoc(recipientDocRef);
      if (recipientDocSnapshot.exists()) {
        const recipientData = recipientDocSnapshot.data();
        setRecipientDisplayName(recipientData.displayName);
      }
    };

    fetchRecipientDisplayName();
  }, [recipientId]);

  useEffect(() => {
    const userTypingRef = doc(fireDB, "users", currentUser.uid);

    const updateTypingStatus = async (typing) => {
      const userDoc = await getDoc(userTypingRef);
      if (!userDoc.exists()) {
        await setDoc(userTypingRef, {
          uid: currentUser.uid,
          displayName: currentUser.displayName,
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
  }, [message, currentUser.uid]);

  const sendMessage = async (event) => {
    event.preventDefault();
    if (message.trim() === "") {
      alert("Enter a valid message");
      return;
    }

    const { uid, displayName, photoURL } = auth.currentUser;
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
            { uid, displayName, photoURL },
            { uid: recipientId, displayName: recipientDisplayName, photoURL },
          ],
          participantIds: [uid, recipientId],
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
      senderDisplayName: displayName,
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
