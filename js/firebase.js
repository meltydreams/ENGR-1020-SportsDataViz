import { initializeApp } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-app.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-firestore.js";

const firebaseConfig = {
  apiKey: "AIzaSyBcnMlH9iQvZMbHvzRyn1akjlj3Lxlb4Mk",
  authDomain: "engr-1020-sportsdataviz.firebaseapp.com",
  projectId: "engr-1020-sportsdataviz",
  storageBucket: "engr-1020-sportsdataviz.appspot.com",
  messagingSenderId: "1032456789012",
  appId: "1:1032456789012:web:abcdef1234567890",
  measurementId: "G-1A2B3C4D5E"
};

const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);