// MessagePage.jsx
import React, { useState, useEffect, useContext, useRef } from "react";
import {
  collection,
  getDocs,
  query,
  orderBy,
  where,
  doc,
  onSnapshot,
  updateDoc,
} from "firebase/firestore";
import { fireDB } from "../Firebase";
import AuthContext from "../AuthContext";
import "./chatStyle.css";
import UserChats from "./UserChats";
import Message from "./Message";
import SendMessage from "./SendMessage";

const MessagePage = () => {
  const [selectedConversation, setSelectedConversation] = useState(null);
  const [otherUserId, setOtherUserId] = useState(null);
  const [otherUserTyping, setOtherUserTyping] = useState(false);
  const [lastOnline, setLastOnline] = useState(null);
  const [loading, setLoading] = useState(true);
  const { currentUser } = useContext(AuthContext);
  const scrollRef = useRef(null);

  useEffect(() => {
    const fetchChats = async () => {
      if (currentUser) {
        const { uid } = currentUser;

        const conversationsQuery = query(
          collection(fireDB, "conversations"),
          where("participantIds", "array-contains", uid),
          orderBy("lastUpdatedAt", "desc")
        );

        try {
          const conversationsSnapshot = await getDocs(conversationsQuery);
          const conversationList = conversationsSnapshot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data(),
          }));

          if (conversationList.length > 0) {
            const firstConversation = conversationList[0];
            const otherUser = firstConversation.participants.find(
              (participant) => participant.uid !== uid
            );
            setSelectedConversation(firstConversation.id);
            setOtherUserId(otherUser.uid);
          } else {
            setSelectedConversation(null);
            setOtherUserId(null);
          }
        } catch (error) {
          console.error("Error fetching conversations:", error);
        }

        setLoading(false);
      }
    };

    fetchChats();
  }, [currentUser]);

  useEffect(() => {
    if (otherUserId) {
      const otherUserStatusRef = doc(fireDB, "users", otherUserId);

      const unsubscribe = onSnapshot(otherUserStatusRef, (doc) => {
        const data = doc.data();
        if (data) {
          setOtherUserTyping(data.typing);
          setLastOnline(data.lastOnline);
        }
      });

      return () => unsubscribe();
    }
  }, [otherUserId]);

  const selectChat = (conversationId, otherUserId) => {
    setSelectedConversation(conversationId);
    setOtherUserId(otherUserId);
  };

  if (!currentUser) {
    return <div>Please log in to see your chats.</div>;
  }

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="message-page">
      <div className="user-chats-container">
        <UserChats selectChat={selectChat} />
      </div>
      <div className="message-area">
        {selectedConversation ? (
          <>
            <div className="typing-status">
              {otherUserTyping
                ? `${otherUserId} is typing...`
                : `Last online: ${new Date(
                    lastOnline?.toDate()
                  ).toLocaleString()}`}
            </div>
            <div className="message-display">
              <Message conversationId={selectedConversation} />
              <div ref={scrollRef}></div>
            </div>
            <div className="message-input">
              <SendMessage
                scroll={scrollRef}
                recipientId={otherUserId}
                conversationId={selectedConversation}
              />
            </div>
          </>
        ) : (
          <div className="no-conversation">
            Select a conversation to start messaging
          </div>
        )}
      </div>
    </div>
  );
};

export default MessagePage;
