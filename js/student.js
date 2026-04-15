//authors: Cihangir Piskin, Drew Tedesco, Ali Sheikh
import { submitShot } from './api.js';

let activeSessionCode = "";
let selectedZone = null;

// Grab session code from URL (e.g., ?session=QKUYNH)
window.onload = () => {
    const urlParams = new URLSearchParams(window.location.search);
    
    // Updated to match your URL parameter 'session'
    const sessionParam = urlParams.get('session'); 
    
    if (sessionParam) {
        activeSessionCode = sessionParam.toUpperCase();
        const display = document.getElementById('displaySessionCode');
        display.innerText = `Joined Session: ${activeSessionCode}`;
        display.style.color = "#333"; // Ensure text is dark/readable
    } else {
        const display = document.getElementById('displaySessionCode');
        display.innerText = "No Active Session Joined";
        display.style.color = "#e74c3c"; // Red for error/warning
    }
};

window.showInputTooltip = function(event, zoneNum) {
    const tooltip = document.getElementById('inputTooltip');
    const header = document.getElementById('tooltipHeader');
    
    selectedZone = `zone${zoneNum}`;
    header.innerText = `Zone ${zoneNum}`;

    const court = document.getElementById('shotInputContainer');
    const rect = court.getBoundingClientRect();
    
    // Calculate position relative to the court container
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
        // Send the data to Firebase via api.js
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