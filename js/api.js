//author: Drew Tedesco
//resources: done in assistance with claude sonnet 4.6 (for firebase workings)

import {db} from "./firebase.js";
import {doc, setDoc, getDoc, collection, addDoc, onSnapshot, serverTimestamp} from "https://www.gstatic.com/firebasejs/10.8.0/firebase-firestore.js";

///---code/session management--

//generates session code using 6-letter code (all caps)
function generateCode(){
    let code = "";
    for(let i = 0; i < 6; i++){
        code += String.fromCharCode(Math.floor(Math.random() * (90 - 65 + 1)) + 65);
    }
    return code;
}

//creates a session in firebase by validating that the code is unique.
//inactive codes are reclaimed so that they never "run out" (shouldn't happen anyway tbh, but for longevity)
export async function createSession(){
    let code = "";
    let available = false;
    while(available === false){
        code = generateCode();
        const snapshot = await getDoc(doc(db, "sessions", code));
        if(!snapshot.exists() || snapshot.data().active === false){
            available = true;
            await setDoc(doc(db, "sessions", code), {createdAt: serverTimestamp(), active: true, closedAt: null});
        }
    }
    return code;
}

//checks if session code already exists & is active (why the hell does js use 3 equal signs?)
export async function sessionExists(code){
    const snapshot = await getDoc(doc(db, "sessions", code));
    if(!snapshot.exists()) return false;
    else return snapshot.data().active === true;
}

//closes a session & marks time of close, making the session code available on next createSession call
export async function terminateSession(code){
    await setDoc(doc(db, "sessions", code), {active: false, closedAt: serverTimestamp()}, {merge: true});
}


///---shot management---
//logs a shot based on session, zone, and made/miss
export async function submitShot(sessionCode, zone, made){
    await addDoc(collection(db, "sessions", sessionCode, "shots"),
        {zone, made, timestamp: serverTimestamp()});
}


//listens for live shot updates & calls back frontend function with updated list of shots (pay attention, frontend)
export function listenForShots(sessionCode, callback){
    const ref = collection(db, "sessions", sessionCode, "shots");
    return onSnapshot(ref, (snapshot) => {
        const shots = snapshot.docs.map(doc => doc.data());
        callback(shots);
    })
}

