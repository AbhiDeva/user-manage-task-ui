import { initializeApp } from "firebase/app";

const firebaseConfig = {
  apiKey: import.meta.env.VITE_APP_FIREBASE_API_KEY,
  authDomain: "taskusermanage.firebaseapp.com",
  projectId: "taskusermanage",
  storageBucket: "taskusermanage.firebasestorage.app",
  messagingSenderId: "277907999099",
  appId: "1:277907999099:web:3e4dcc64e30d53596e15de",
};

export const app = initializeApp(firebaseConfig);
