import React, { useState, useContext, useEffect } from "react";
import { auth, fireDB } from "../Firebase.jsx";
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
import AuthContext from "../AuthContext.jsx";
import "./chatStyle.css";

const SendMessage = ({ scroll, recipientId, conversationId }) => {
  const [message, setMessage] = useState("");
  const { currentUser } = useContext(AuthContext);
  const [recipientDisplayName, setRecipientDisplayName] = useState(""); // State to store recipient's display name

  // Fetch recipient's display name
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

  const sendMessage = async (event) => {
    event.preventDefault();
    if (message.trim() === "") {
      alert("Enter a valid message");
      return;
    }

    const { uid, displayName, photoURL } = auth.currentUser;
    let convId = conversationId;

    if (!conversationId) {
      // Check if conversation already exists
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
        // Create a new conversation
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
            { uid: recipientId, displayName: recipientDisplayName, photoURL }, // Use recipient's display name here
          ],
          participantIds: [uid, recipientId],
        });
        convId = newConversationRef.id;
      } else {
        // Use the existing conversation
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
    });

    // Update last message in conversation document
    const conversationRef = doc(fireDB, "conversations", convId);
    await updateDoc(conversationRef, {
      lastMessage: { message, senderId: uid, timestamp: serverTimestamp() },
      lastUpdatedAt: serverTimestamp(),
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
        placeholder={`Message ${recipientDisplayName}`} // Display recipient's display name in placeholder
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
