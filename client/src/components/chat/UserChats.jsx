import React, { useEffect, useState, useContext } from "react";
import {
  collection,
  getDocs,
  query,
  orderBy,
  where,
  doc,
  onSnapshot,
} from "firebase/firestore";
import { fireDB } from "../Firebase.jsx";
import AuthContext from "../AuthContext.jsx";
import "./chatStyle.css";

const UserChats = ({ selectChat }) => {
  const [chats, setChats] = useState([]);
  const [selectedChatId, setSelectedChatId] = useState(null);
  const { currentUser } = useContext(AuthContext);

  useEffect(() => {
    const fetchChats = async () => {
      if (currentUser) {
        const { uid } = currentUser;

        const conversationsQuery = query(
          collection(fireDB, "conversations"),
          where("participantIds", "array-contains", uid),
          orderBy("lastUpdatedAt", "desc")
        );

        const conversationsSnapshot = await getDocs(conversationsQuery);
        const conversationList = conversationsSnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));

        const chatList = await Promise.all(
          conversationList.map(async (conversation) => {
            const otherUser = conversation.participants.find(
              (participant) => participant.uid !== uid
            );

            const otherUserDocRef = doc(fireDB, "users", otherUser.uid);
            let otherUserStatus = "offline"; // default to offline

            const unsubscribe = onSnapshot(otherUserDocRef, (docSnapshot) => {
              if (docSnapshot.exists()) {
                otherUserStatus = docSnapshot.data().online
                  ? "online"
                  : "offline";
                setChats((prevChats) =>
                  prevChats.map((chat) =>
                    chat.id === conversation.id
                      ? { ...chat, otherUserStatus } // Update only the relevant chat
                      : chat
                  )
                );
              }
            });

            return {
              id: conversation.id,
              text: conversation.lastMessage.message,
              otherUserId: otherUser.uid,
              otherUserName: otherUser.displayName || "unknown",
              createdAt: conversation.lastUpdatedAt,
              otherUserStatus,
              unsubscribe, // Store the unsubscribe function
            };
          })
        );

        setChats(chatList);
      }
    };

    fetchChats();

    // Cleanup function to unsubscribe from all snapshot listeners
    return () => {
      chats.forEach((chat) => {
        chat.unsubscribe(); // Call the stored unsubscribe function
      });
    };
  }, [currentUser]); // Only useEffect depends on currentUser

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
          onClick={() => {
            setSelectedChatId(chat.id);
            selectChat(chat.id, {
              uid: chat.otherUserId,
              displayName: chat.otherUserName,
            });
          }}
        >
          <div className={`status-light ${chat.otherUserStatus}`}></div>
          {chat.otherUserName}
        </div>
      ))}
    </div>
  );
};

export default UserChats;
