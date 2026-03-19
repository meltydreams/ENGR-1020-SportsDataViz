// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyCEnEyO_CBqWCZNoHJbiQ88vK-0sPqq9NY",
    authDomain: "engr-1020-sportsdataviz.firebaseapp.com",
    projectId: "engr-1020-sportsdataviz",
    storageBucket: "engr-1020-sportsdataviz.firebasestorage.app",
    messagingSenderId: "26705667909",
    appId: "1:26705667909:web:59a2fc47a1573339a9802c",
    measurementId: "G-H4ZB8KKXHC"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);