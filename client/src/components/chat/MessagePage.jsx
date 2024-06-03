import React, { useState, useEffect, useContext, useRef } from "react";
import {
  collection,
  getDocs,
  query,
  orderBy,
  where,
  doc,
  getDoc,
  onSnapshot,
} from "firebase/firestore";
import { fireDB } from "../Firebase.jsx";
import AuthContext from "../AuthContext.jsx";
import "./chatStyle.css";
import UserChats from "./UserChats.jsx";
import Message from "./Message.jsx";
import SendMessage from "./SendMessage.jsx";

const MessagePage = () => {
  const [selectedConversation, setSelectedConversation] = useState(null);
  const [otherUserId, setOtherUserId] = useState(null);
  const [otherUserName, setOtherUserName] = useState(null);
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
            setOtherUserName(otherUser.displayName);
          } else {
            setSelectedConversation(null);
            setOtherUserId(null);
            setOtherUserName(null);
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
    if (selectedConversation && otherUserId) {
      const conversationRef = doc(
        fireDB,
        "conversations",
        selectedConversation
      );

      const unsubscribe = onSnapshot(conversationRef, (doc) => {
        const data = doc.data();
        if (data) {
          const otherUser = data.participants.find(
            (participant) => participant.uid === otherUserId
          );
          setOtherUserTyping(otherUser.typing);
          setLastOnline(otherUser.lastOnline); // Ensure lastOnline is set correctly
          setOtherUserName(otherUser.displayName);
        }
      });

      return () => unsubscribe();
    }
  }, [selectedConversation, otherUserId]);

  const selectChat = (conversationId, otherUserId) => {
    setSelectedConversation(conversationId);
    setOtherUserId(otherUserId);
    const fetchOtherUserName = async () => {
      const conversationDoc = await getDoc(
        doc(fireDB, "conversations", conversationId)
      );
      const otherUser = conversationDoc
        .data()
        .participants.find((participant) => participant.uid === otherUserId);
      setOtherUserName(otherUser.displayName);
    };
    fetchOtherUserName();
  };

  const formatLastOnline = (lastOnline) => {
    if (!lastOnline || !(lastOnline instanceof Date)) {
      return `${otherUserName} was last active a long time ago`;
    }

    const now = new Date();
    const lastOnlineDate = lastOnline.toDate();
    const diffTime = Math.abs(now - lastOnlineDate);
    const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));

    const formatTime = (date) => {
      let hours = date.getHours();
      const minutes = date.getMinutes().toString().padStart(2, "0");
      const ampm = hours >= 12 ? "PM" : "AM";
      hours = hours % 12;
      hours = hours ? hours : 12;
      return `${hours}:${minutes} ${ampm}`;
    };

    if (diffDays === 0) {
      return `${otherUserName} was last active at ${formatTime(
        lastOnlineDate
      )}`;
    } else if (diffDays < 7) {
      return `${otherUserName} was last active ${diffDays} day${
        diffDays > 1 ? "s" : ""
      } ago at ${formatTime(lastOnlineDate)}`;
    } else {
      return `${otherUserName} was last active more than a week ago`;
    }
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
            <div className="message-display">
              <Message
                conversationId={selectedConversation}
                scrollRef={scrollRef}
              />
              <div ref={scrollRef}></div>
            </div>
            <div className="typing-status status-text">
              {otherUserTyping
                ? `${otherUserName} is typing...`
                : formatLastOnline(lastOnline)}
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
