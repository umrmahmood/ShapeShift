import { admin } from "../config/firebase";

const NotificationController = {
  sendNotification: async (receiverId, message) => {
    const payload = {
      notification: {
        title: "New Message",
        body: message,
      },
      token: receiverId, // You need the FCM token of the receiver
    };

    try {
      await admin.messaging().send(payload);
    } catch (error) {
      console.error("Error sending notification:", error);
    }
  },
};

export default NotificationController;
