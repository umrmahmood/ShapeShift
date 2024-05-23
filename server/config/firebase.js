// firebase.js

import admin from "firebase-admin";
import serviceAccount from "./firebaseAdminsdk.json" assert { type: "json" };

if (!admin.apps.length) {
  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: "", // Replace with your database URL if needed
  });
}

console.log(serviceAccount);

const FireDB = admin.firestore();

export { admin, FireDB };
