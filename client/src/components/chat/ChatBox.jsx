import React, { useState } from "react";
import UserChats from "./UserChats.jsx";
import Message from "./Message.jsx";
import SendMessage from "./SendMessage.jsx";
import "./chatStyle.css";

const ChatBox = () => {
  const [selectedConversationId, setSelectedConversationId] = useState(null);
  const [recipientId, setRecipientId] = useState(null);

  const selectChat = (conversationId, recipientId) => {
    setSelectedConversationId(conversationId);
    setRecipientId(recipientId);
  };

  return (
    <div className="chat-box">
      <UserChats selectChat={selectChat} />
      <div className="message-container">
        {selectedConversationId ? (
          <Message conversationId={selectedConversationId} />
        ) : (
          <div>Select a conversation to view messages</div>
        )}
      </div>
      {selectedConversationId && recipientId && (
        <SendMessage
          conversationId={selectedConversationId}
          recipientId={recipientId}
        />
      )}
    </div>
  );
};

export default ChatBox;
