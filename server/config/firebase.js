// firebase.js

// Importing the Firebase Admin SDK
import admin from "firebase-admin";


// Importing the service account credentials from a JSON file
import serviceAccount from "./firebaseAdminsdk.json" assert { type: "json" };


// Checking if the Firebase Admin SDK has been initialized already
if (!admin.apps.length) {
  // Initializing the Firebase Admin SDK with the service account credentials
  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: "", // Replace with your database URL if needed
  });
}

// Creating a Firestore database instance
const FireDB = admin.firestore();

// Exporting the admin SDK and Firestore database instance for use in other modules
export { admin, FireDB };
