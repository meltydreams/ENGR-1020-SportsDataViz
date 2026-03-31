//original author: Cihangir Piskin
//reviewed & overhauled by Drew Tedesco

import {createSession, terminateSession, listenForShots} from "./api";

//variables to track
let sessionCode = null;
let unsubscribe = null;

//generates a validated unique session code & immediately starts listening for shots
async function startSession(){
    sessionCode = await createSession();
    document.getElementById("sessionCode").innerHTML = "Session code: " + sessionCode;
    unsubscribe = listenForShots(sessionCode, updateHeatmap);
}

//stops the session after validating that a session with such code exists & nulls the code
async function stopSession(){
    if(!sessionCode){
        alert("No such session");
    }
    if(unsubscribe) unsubscribe();
    await terminateSession(sessionCode);
    sessionCode = null;
    document.getElementById("sessionCode").innerText = "No active session";
}

//loops through the shots taken in each zone and formulates an accuracy percentage for each zone
function updateHeatmap(shots){
    const stats = {};

    shots.forEach(shot => {
        if(!stats[shot.zone]){
            stats[shot.zone] = {made: 0, total: 0};
        }
        stats[shot.zone].total++;
        if(shot.made) stats[shot.zone].made++;
    });

    for (let zone in stats) {
        const percent = (stats[zone].made / stats[zone].total) * 100;
        const element = document.getElementById(zone);
        if(element){
            element.style.backgroundColor = getColor(percent);
        }
    }
}

//defines zone color based on accuracy
function getColor(percent){
    if(percent >= 75) return "green";
    if(percent >= 50) return "yellow";
    if(percent >= 25) return "orange";
    return "red";
}

window.startSession = startSession;
window.stopSession = stopSession;