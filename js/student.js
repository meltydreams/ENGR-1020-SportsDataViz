//authors: Cihangir Piskin, Drew Tedesco, Ali Sheikh
import { submitShot } from './api.js';

let activeSessionCode = "";
let selectedZone = null;

/**
 * 1. SESSION JOINING LOGIC
 * This runs on index.html (the join page)
 */
window.joinSession = function() {
    const codeInput = document.getElementById('sessionCodeInput');
    if (!codeInput) return;

    const code = codeInput.value.trim().toUpperCase();
    
    if (code.length === 6) {
        console.log("Redirecting to session:", code);
        // FIXED: Added 'html/' to the path so it finds the file in the correct folder
        window.location.href = `html/student.html?session=${code}`;
    } else {
        alert("Please enter a valid 6-letter session code.");
    }
};

/**
 * 2. COURT INITIALIZATION LOGIC
 * This runs on student.html (the court page)
 */
window.onload = () => {
    const urlParams = new URLSearchParams(window.location.search);
    const sessionParam = urlParams.get('session'); 
    
    const display = document.getElementById('displaySessionCode');
    
    if (sessionParam && display) {
        activeSessionCode = sessionParam.toUpperCase();
        display.innerText = `Joined Session: ${activeSessionCode}`;
        display.style.color = "#333";
    } else if (display) {
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

    const court = document.getElementById('shotInputContainer');
    const rect = court.getBoundingClientRect();
    
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;

    tooltip.style.left = `${x - 60}px`;
    tooltip.style.top = `${y - 110}px`; 
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
        await submitShot(activeSessionCode, selectedZone, isMade);
        console.log(`✅ Success: Shot logged in ${selectedZone} (Made: ${isMade})`);
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