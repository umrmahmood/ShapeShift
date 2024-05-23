// sendMessage.jsx

import React, { useState } from "react";
import PropTypes from "prop-types";
import "./MessagePopup.css"; // Import the CSS file for styling
import SendMessage from "../components/chat/SendMessage.jsx";

const SendMessagePop = ({ firstRecipientId, isOpen, onClose, scroll }) => {
  if (!isOpen) {
    return null;
  }
  const recipientId = firstRecipientId.firebaseId;
  console.log("receiver end", recipientId);
  return (
    <div className="message-popup-overlay" onClick={onClose}>
      <div
        className="message-popup-content"
        onClick={(e) => e.stopPropagation()}
      >
        <h2>Send Message</h2>
        <SendMessage
          // scroll={scrollRef}
          recipientId={recipientId}
          initiateNewConversation={true}
        />
      </div>
    </div>
  );
};

SendMessagePop.propTypes = {
  firstRecipientId: PropTypes.string.isRequired,
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  scroll: PropTypes.object.isRequired,
};

export default SendMessagePop;
