// messageController.js

import { FireDB, admin } from "../config/firebase.js";

const MessageController = {
  sendMessage: async (req, res) => {
    const senderId = req.user.firebaseId;
    const { receiverId, message } = req.body;

    console.log("Message", message);
    console.log("Sender", senderId);
    console.log("Receiver", receiverId);

    if (!senderId || !receiverId || !message) {
      return res.status(400).json({ error: "Missing required fields" });
    }

    try {
      const conversationRef = FireDB.collection("conversations").doc();
      const newMessage = {
        senderId,
        receiverId,
        message,
        timestamp: admin.firestore.FieldValue.serverTimestamp(),
      };

      let conversationId;
      const conversationSnapshot = await FireDB.collection("conversations")
        .where("participants", "array-contains", senderId)
        .get();

      conversationSnapshot.forEach((doc) => {
        if (doc.data().participants.includes(receiverId)) {
          conversationId = doc.id;
        }
      });

      if (!conversationId) {
        conversationId = conversationRef.id;
        await FireDB.collection("conversations")
          .doc(conversationId)
          .set({
            participants: [senderId, receiverId],
            lastMessage: message,
            lastMessageTimestamp: new Date(),
          });
      } else {
        await FireDB.collection("conversations").doc(conversationId).update({
          lastMessage: message,
          lastMessageTimestamp: new Date(),
        });
      }

      await FireDB.collection("conversations")
        .doc(conversationId)
        .collection("messages")
        .add(newMessage);

      const receiverDoc = await FireDB.collection("users")
        .doc(receiverId)
        .get();
      const receiverData = receiverDoc.data();

      if (receiverData && receiverData.fcmToken) {
        const messagePayload = {
          notification: {
            title: "New Message",
            body: message,
          },
          token: receiverData.fcmToken,
        };

        admin
          .messaging()
          .send(messagePayload)
          .then((response) => {
            console.log("Successfully sent message:", response);
          })
          .catch((error) => {
            console.error("Error sending message:", error);
          });
      }
      console.log("Message", message);
      console.log("Sender", senderId);
      console.log("Receiver", receiverId);

      res.status(201).json(newMessage);
    } catch (error) {
      console.error("Error sending message:", error);
      res.status(500).json({ message: "Error sending message" });
    }
  },

  getConversationsByUserId: async (req, res) => {
    const { firebaseId } = req.params;

    try {
      const conversationsSnapshot = await FireDB.collection("conversations")
        .where("participants", "array-contains", firebaseId)
        .get();

      const conversations = conversationsSnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));

      res.status(200).json(conversations);
    } catch (error) {
      console.error("Error fetching conversations:", error);
      res.status(500).json({ message: "Error fetching conversations" });
    }
  },
};

export default MessageController;
