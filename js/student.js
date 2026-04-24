//authors: Cihangir Piskin, Drew Tedesco, Ali Sheikh
import { submitShot } from './api.js';

let activeSessionCode = "";
let selectedZone = null;
let currentStudentName = "Anonymous"; // NEW: Store the student's name

// Grab session code and name from URL (e.g., ?session=QKUYNH&name=John)
window.onload = () => {
    const urlParams = new URLSearchParams(window.location.search);
    
    const sessionParam = urlParams.get('session'); 
    const nameParam = urlParams.get('name'); // NEW: Get name from URL
    
    if (nameParam) {
        currentStudentName = decodeURIComponent(nameParam);
    }
    
    const display = document.getElementById('displaySessionCode');

    if (sessionParam) {
        activeSessionCode = sessionParam.toUpperCase();
        // NEW: Show both Player Name and Session Code
        display.innerText = `Player: ${currentStudentName} | Session: ${activeSessionCode}`;
        display.style.color = "#333"; 
    } else {
        display.innerText = "No Active Session Joined";
        display.style.color = "#e74c3c"; 
    }
};

/**
 * 3. SHOT LOGGING LOGIC
 */
window.showInputTooltip = function(event, zoneNum) {
    const tooltip = document.getElementById('inputTooltip');
    const header = document.getElementById('tooltipHeader');
    
    selectedZone = `zone${zoneNum}`;
    header.innerText = `Zone ${zoneNum}`;

    // Removed the mouse tracking math!
    // Instead, lock the popup perfectly to the center of the court container
    tooltip.style.left = '50%';
    tooltip.style.top = '50%';
    tooltip.style.transform = 'translate(-50%, -50%)'; 

    tooltip.classList.remove('hidden');
};

window.submitLoggedShot = async function(isMade) {
    const tooltip = document.getElementById('inputTooltip');
    
    if (!activeSessionCode) {
        alert("You haven't joined a session yet!");
        return;
    }

    if (!selectedZone) return;

    tooltip.classList.add('hidden');
    
    try {
        // NEW: Pass currentStudentName to the API so it logs who took the shot
        await submitShot(activeSessionCode, selectedZone, isMade, currentStudentName);
        console.log(`✅ Success: Shot logged in ${selectedZone} by ${currentStudentName} (Made: ${isMade})`);
    } catch (error) {
        console.error("❌ Submission Error:", error);
        alert("Failed to log shot. Please check your connection.");
    }
};

// Close tooltip if clicking away
document.addEventListener('mousedown', (e) => {
    const tooltip = document.getElementById('inputTooltip');
    if (tooltip && !tooltip.contains(e.target) && !e.target.classList.contains('zone')) {
        tooltip.classList.add('hidden');
    }
});