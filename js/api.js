//authors: Drew Tedesco, Ali Sheikh
import { db } from "./firebase.js";
import { doc, setDoc, getDoc, collection, addDoc, onSnapshot, serverTimestamp } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-firestore.js";

// Generates session code using 6-letter code (all caps)
function generateCode() {
    let code = "";
    for (let i = 0; i < 6; i++) {
        code += String.fromCharCode(Math.floor(Math.random() * (90 - 65 + 1)) + 65);
    }
    return code;
}

// Creates a session in firebase
async function createSession() {
    let code = "";
    let available = false;
    while (available === false) {
        code = generateCode();
        const snapshot = await getDoc(doc(db, "sessions", code));
        // Reclaim inactive codes
        if (!snapshot.exists() || snapshot.data().active === false) {
            available = true;
            await setDoc(doc(db, "sessions", code), {
                createdAt: serverTimestamp(),
                active: true,
                closedAt: null
            });
        }
    }
    return code;
}

async function sessionExists(code) {
    const snapshot = await getDoc(doc(db, "sessions", code));
    return snapshot.exists() && snapshot.data().active === true;
}

async function terminateSession(code) {
    await setDoc(doc(db, "sessions", code), { active: false, closedAt: serverTimestamp() }, { merge: true });
}

async function submitShot(sessionCode, zone, made, studentName) {
    await addDoc(collection(db, "sessions", sessionCode, "shots"), {
        zone,
        made,
        studentName,
        timestamp: serverTimestamp()
    });
}

function listenForShots(sessionCode, callback) {
    const ref = collection(db, "sessions", sessionCode, "shots");
    return onSnapshot(ref, (snapshot) => {
        const shots = snapshot.docs.map(doc => doc.data());
        callback(shots);
    });
}

// Explicitly export everything at the bottom to avoid "missing export" errors
export { createSession, sessionExists, terminateSession, submitShot, listenForShots };