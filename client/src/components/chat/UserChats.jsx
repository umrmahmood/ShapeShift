import React, { useEffect, useState, useContext } from "react";
import {
  collection,
  query,
  where,
  orderBy,
  onSnapshot,
  updateDoc,
  doc,
  getDoc,
} from "firebase/firestore";
import { fireDB } from "../Firebase.jsx";
import AuthContext from "../AuthContext.jsx";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEnvelope } from "@fortawesome/free-solid-svg-icons";
import "./chatStyle.css";

const UserChats = ({ selectChat }) => {
  const [chats, setChats] = useState([]);
  const [selectedChatId, setSelectedChatId] = useState(null);
  const { currentUser } = useContext(AuthContext);

  useEffect(() => {
    if (!currentUser) return;

    const { uid } = currentUser;

    const conversationsQuery = query(
      collection(fireDB, "conversations"),
      where("participantIds", "array-contains", uid),
      orderBy("lastUpdatedAt", "desc")
    );

    const unsubscribe = onSnapshot(conversationsQuery, (snapshot) => {
      const conversationList = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));

      const chatPromises = conversationList.map(async (conversation) => {
        const otherUser = conversation.participants.find(
          (participant) => participant.uid !== uid
        );

        const otherUserDocRef = doc(fireDB, "users", otherUser.uid);
        const otherUserSnapshot = await getDoc(otherUserDocRef);
        const otherUserStatus = otherUserSnapshot.exists()
          ? otherUserSnapshot.data().online
            ? "online"
            : "offline"
          : "offline";

        return {
          id: conversation.id,
          text: conversation.lastMessage.message,
          otherUserId: otherUser.uid,
          otherUserName: otherUser.displayName || "unknown",
          createdAt: conversation.lastUpdatedAt,
          otherUserStatus,
          unread: !conversation.readStatus[uid],
        };
      });

      Promise.all(chatPromises).then((chatList) => setChats(chatList));
    });

    return () => unsubscribe();
  }, [currentUser]);

  const handleSelectChat = async (chat) => {
    setSelectedChatId(chat.id);
    selectChat(chat.id, {
      uid: chat.otherUserId,
      displayName: chat.otherUserName,
    });

    if (chat.unread) {
      const conversationRef = doc(fireDB, "conversations", chat.id);
      await updateDoc(conversationRef, {
        [`readStatus.${currentUser.uid}`]: true,
      });

      setChats((prevChats) =>
        prevChats.map((c) => (c.id === chat.id ? { ...c, unread: false } : c))
      );
    }
  };

  if (!currentUser) {
    return <div>Please log in to see your chats.</div>;
  }

  return (
    <div className="user-chats">
      {chats.map((chat) => (
        <div
          key={chat.id}
          className={`chat-item ${
            chat.id === selectedChatId ? "selected" : ""
          }`}
          onClick={() => handleSelectChat(chat)}
        >
          <div className={`status-light ${chat.otherUserStatus}`}></div>
          {chat.otherUserName}
          {chat.unread && (
            <FontAwesomeIcon icon={faEnvelope} className="unread-icon" />
          )}
        </div>
      ))}
    </div>
  );
};

export default UserChats;
