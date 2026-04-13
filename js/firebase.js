// Use the CDN versions so the browser can download the Firebase SDK
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-app.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-firestore.js";

// Your actual keys you just found
const firebaseConfig = {
  apiKey: "AIzaSyD0IhSLjMAaVNELAyz5M0I-EmZ_OIh3-wI",
  authDomain: "engr-1020-sportsdataviz.firebaseapp.com",
  projectId: "engr-1020-sportsdataviz",
  storageBucket: "engr-1020-sportsdataviz.firebasestorage.app",
  messagingSenderId: "26705667909",
  appId: "1:26705667909:web:59a2fc47a1573339a9802c",
  measurementId: "G-H4ZB8KKXHC"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Export 'db' so api.js can use it to create sessions
export const db = getFirestore(app);