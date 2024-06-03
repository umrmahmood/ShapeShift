import React, { useState, useContext, useEffect } from "react";
import PropTypes from "prop-types";
import { auth, fireDB } from "../components/Firebase.jsx";
import {
  addDoc,
  collection,
  doc,
  serverTimestamp,
  updateDoc,
  setDoc,
  query,
  where,
  getDocs,
  getDoc,
} from "firebase/firestore";
import AuthContext from "../components/AuthContext.jsx";
import { jwtDecode } from "jwt-decode"; // Import jwtDecode to decode JWT tokens
import "./MessagePopup.css"; // Import the CSS file for styling

const SendMessagePop = ({
  firstRecipientId,
  firstRecipientUsername,
  isOpen,
  onClose,
  scroll,
}) => {
  const [message, setMessage] = useState("");
  const [messageSent, setMessageSent] = useState(false);
  const { currentUser } = useContext(AuthContext);
  const [username, setUsername] = useState("");
  const recipient = firstRecipientId;

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

  const sendMessage = async (event) => {
    event.preventDefault();

    if (!recipient) {
      console.log("Recipient is missing");
      return;
    }

    if (message.trim() === "") {
      alert("Enter a valid message");
      return;
    }

    const { uid } = auth.currentUser;
    let convId = null;

    // Check if conversation already exists
    const existingConversationQuery = query(
      collection(fireDB, "conversations"),
      where("participantIds", "array-contains", uid)
    );

    const existingConversationSnapshot = await getDocs(
      existingConversationQuery
    );

    const existingConversation = existingConversationSnapshot.docs.find((doc) =>
      doc.data().participantIds.includes(recipient.firebaseId)
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
          { uid, displayName: username },
          {
            uid: recipient.firebaseId,
            displayName: firstRecipientUsername,
          },
        ],
        participantIds: [uid, recipient.firebaseId],
        readStatus: { [uid]: true, [recipient.firebaseId]: false },
      });
      convId = newConversationRef.id;
    } else {
      // Use the existing conversation
      convId = existingConversation.id;
    }

    const messagesCollectionRef = collection(fireDB, "messages");

    await addDoc(messagesCollectionRef, {
      conversationId: convId,
      message,
      senderId: uid,
      senderDisplayName: username,
      recipientId: recipient.firebaseId,
      status: "sent",
      timestamp: serverTimestamp(),
      readBy: [uid], // Initialize with sender's uid
    });

    // Update last message in conversation document
    const conversationRef = doc(fireDB, "conversations", convId);
    await updateDoc(conversationRef, {
      lastMessage: { message, senderId: uid, timestamp: serverTimestamp() },
      lastUpdatedAt: serverTimestamp(),
      [`readStatus.${recipient.firebaseId}`]: false,
    });

    setMessage("");
    setMessageSent(true);
    if (scroll && scroll.current) {
      scroll.current.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div className="message-popup-overlay" onClick={onClose}>
      <div
        className="message-popup-content"
        onClick={(e) => e.stopPropagation()}
      >
        {messageSent ? (
          <div>
            <h2>Message Sent</h2>
            <p>Message was successfully sent.</p>
            <p>Click outside this window to close.</p>
          </div>
        ) : (
          <div>
            <h2>Send Message to {firstRecipientUsername}</h2>
            <form onSubmit={sendMessage} className="send-message">
              <label htmlFor="messageInput" hidden>
                Enter Message
              </label>
              <input
                id="messageInput"
                name="messageInput"
                type="text"
                className="form-input__input"
                placeholder="Type message..."
                value={message}
                onChange={(e) => setMessage(e.target.value)}
              />
              <button type="submit">Send</button>
            </form>
          </div>
        )}
      </div>
    </div>
  );
};

SendMessagePop.propTypes = {
  firstRecipientId: PropTypes.string.isRequired,
  firstRecipientUsername: PropTypes.string.isRequired,
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  scroll: PropTypes.object.isRequired,
};

export default SendMessagePop;
