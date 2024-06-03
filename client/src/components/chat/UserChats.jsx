import React, { useEffect, useState, useContext } from "react";
import { collection, getDocs, query, orderBy, where } from "firebase/firestore";
import { fireDB } from "../Firebase";
import AuthContext from "../AuthContext";
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

            let unreadCount = 0;
            if (conversation.readStatus && !conversation.readStatus[uid]) {
              unreadCount = conversation.messages.filter(
                (msg) => !msg.readBy.includes(uid)
              ).length;
            }

            return {
              id: conversation.id,
              text: conversation.lastMessage.message,
              otherUserId: otherUser.uid,
              otherUserName: otherUser.displayName || "unknown",
              unreadCount,
              createdAt: conversation.lastUpdatedAt,
            };
          })
        );

        setChats(chatList);
      }
    };

    fetchChats();
  }, [currentUser]);

  const [typingStatus, setTypingStatus] = useState({});
  useEffect(() => {
    const fetchTypingStatus = async () => {
      if (currentUser) {
        const { uid } = currentUser;
        const usersRef = collection(fireDB, "users");

        const usersSnapshot = await getDocs(usersRef);
        const typingStatusData = usersSnapshot.docs.reduce((acc, doc) => {
          const userData = doc.data();
          if (userData.uid !== uid) {
            acc[userData.uid] = userData.typing
              ? `${userData.displayName} is typing...`
              : `${userData.displayName} was last online on ${new Date(
                  userData.lastOnline?.toDate()
                ).toLocaleString()}`;
          }
          return acc;
        }, {});

        setTypingStatus(typingStatusData);
      }
    };

    fetchTypingStatus();
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
          {chat.unreadCount > 0 && (
            <span className="unread-count">{chat.unreadCount}</span>
          )}
          <div className="typing-status">{typingStatus[chat.otherUserId]}</div>
        </div>
      ))}
    </div>
  );
};

export default UserChats;
