//original author: Cihangir Piskin
//reviewed & overhauled by Drew Tedesco

import { submitShot } from './api.js';

let activeSessionCode = "";
let selectedZone = null;

// Grab code from URL
window.onload = () => {
    const urlParams = new URLSearchParams(window.location.search);
    const code = urlParams.get('code');
    if (code) {
        activeSessionCode = code;
        document.getElementById('displaySessionCode').innerText = `Joined Session: ${code}`;
    }
};

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
    tooltip.style.top = `${y - 90}px`;
    tooltip.classList.remove('hidden');
};

window.submitLoggedShot = async function(isMade) {
    const tooltip = document.getElementById('inputTooltip');
    if (!selectedZone || !activeSessionCode) return;

    tooltip.classList.add('hidden');
    const success = await submitShot(activeSessionCode, selectedZone, isMade);
    if (!success) alert("Error submitting shot. Check teacher session.");
};

// Close tooltip if clicking away
document.addEventListener('mousedown', (e) => {
    const tooltip = document.getElementById('inputTooltip');
    if (tooltip && !tooltip.contains(e.target) && !e.target.classList.contains('zone')) {
        tooltip.classList.add('hidden');
    }
});