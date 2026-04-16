<<<<<<< HEAD
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-app.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-firestore.js";

const firebaseConfig = {
  apiKey: "AIzaSyAb--hrH59doyVwnCdH2m4UNi3BEpPsnQ0",
  authDomain: "engr-1020-sportsdataviz.firebaseapp.com",
  projectId: "engr-1020-sportsdataviz",
  storageBucket: "engr-1020-sportsdataviz.firebasestorage.app",
  messagingSenderId: "26705667909",
  appId: "1:26705667909:web:59a2fc47a1573339a9802c",
  measurementId: "G-H4ZB8KKXHC"
};

const app = initializeApp(firebaseConfig);

=======
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-app.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-firestore.js";

const firebaseConfig = {
  apiKey: "AIzaSyAb--hrH59doyVwnCdH2m4UNi3BEpPsnQ0",
  authDomain: "engr-1020-sportsdataviz.firebaseapp.com",
  projectId: "engr-1020-sportsdataviz",
  storageBucket: "engr-1020-sportsdataviz.firebasestorage.app",
  messagingSenderId: "26705667909",
  appId: "1:26705667909:web:59a2fc47a1573339a9802c",
  measurementId: "G-H4ZB8KKXHC"
};

const app = initializeApp(firebaseConfig);

>>>>>>> 9bb11ac8fda95ce289f4e57a08f4e22bc7672ed1
export const db = getFirestore(app);