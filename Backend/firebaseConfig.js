import admin from "firebase-admin";
import {initializeApp} from "firebase/app"
import dotenv from "dotenv";


// loads environment variables from .env file
dotenv.config();

// Initialize Firebase Client SDK
const firebaseConfig = {
  apiKey: process.env.FIREBASE_WEB_API_KEY,
  authDomain: `${process.env.FIREBASE_PROJECT_ID}.firebaseapp.com`,
  projectId: process.env.FIREBASE_PROJECT_ID,
};

// Initialize Firebase Admin SDK 
admin.initializeApp({
  credential: admin.credential.cert({
    projectId: process.env.FIREBASE_PROJECT_ID,
    clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
    privateKey: process.env.FIREBASE_PRIVATE_KEY.replace(/\\n/g, "\n"),
  })
});

// Initialize Firebase Client SDK
const clientApp = initializeApp(firebaseConfig);

// create firestore and auth instances
const auth = admin.auth();
const db = admin.firestore();

export { clientApp, db, auth };