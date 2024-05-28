import React, { useEffect, useState, useContext } from "react";
import { collection, getDocs, query, orderBy, where } from "firebase/firestore";
import { fireDB } from "../Firebase.jsx";
import AuthContext from "../AuthContext.jsx";
import "./chatStyle.css";

const UserChats = ({ selectChat }) => {
  const [chats, setChats] = useState([]);
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

            return {
              id: conversation.id,
              text: conversation.lastMessage.message,
              otherUserId: otherUser.uid,
              otherUserName: otherUser.displayName || "unknown",
              createdAt: conversation.lastUpdatedAt,
            };
          })
        );

        setChats(chatList);
      }
    };

    fetchChats();
  }, [currentUser]);

  if (!currentUser) {
    return <div>Please log in to see your chats.</div>;
  }

  return (
    <div className="user-chats">
      {chats.map((chat) => (
        <div
          key={chat.id}
          className="chat-item"
          onClick={() => selectChat(chat.id, chat.otherUserId)}
        >
          {chat.otherUserName}
        </div>
      ))}
    </div>
  );
};

export default UserChats;
