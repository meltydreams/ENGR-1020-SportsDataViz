//original author: Cihangir Piskin
//reviewed & overhauled by Drew Tedesco

import {submitShot, sessionExists} from "./api";

//reads session code from URL
const params = new URLSearchParams(window.location.search);
const sessionCode = params.get("sessionCode");

//variables to track during gameplay
let curZone = null;
let shotCount = 0;

//runs at page load - checks if URL is active & attaches the functions so that they can be called
async function init(){
    const isValid = await sessionExists(sessionCode);
    if(!isValid){
        alert("Invalid session code");
        return;
    }

    window.selectZone = selectZone;
    window.recordShot = recordShot;
}

//updates curZone with the current zone.
function selectZone(zone){
    curZone = zone;
    alert("Selected zone " + zone);
}

//records a shot after checking if a zone is selected. writes the shot to firestore & increments the shot counter
async function recordShot(result) {
    if (!curZone) {
        alert("No such zone");
        return;
    }
    const made = (result === "make");
    await submitShot(sessionCode, curZone, made);
    shotCount++;
    document.getElementById("shotNumber").innerHTML = "Shot number " + shotCount;
}

//initializes
init();
