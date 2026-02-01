// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  // apiKey: import.meta.env.firebe_key_one ,
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "my-projects-9fdb0.firebaseapp.com",
  projectId: "my-projects-9fdb0",
  storageBucket: "my-projects-9fdb0.firebasestorage.app",
  messagingSenderId: "546232718372",
  appId: "1:546232718372:web:17b5e2dd865b957a2834b1"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);



















// src/firebase.js
// import { initializeApp } from "firebase/app";
// import { getAuth } from "firebase/auth";

// const firebaseConfig = {
//   apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
//   authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
//   projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
//   storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
//   messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
//   appId: import.meta.env.VITE_FIREBASE_APP_ID
// };

// export const app = initializeApp(firebaseConfig);
// export const auth = getAuth(app);
