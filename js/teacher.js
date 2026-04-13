//original author: Cihangir Piskin
//reviewed & overhauled by Drew Tedesco

import { createSession, listenForShots } from './api.js';

window.createNewSession = async function() {
    const display = document.getElementById('sessionCodeDisplay');
    const feed = document.getElementById('liveDataFeed');
    
    if (!display) return;
    display.innerText = "Generating Code...";

    try {
        const newCode = await createSession();
        display.innerText = `Session Code: ${newCode}`;
        
        if (feed) {
            feed.innerHTML = `<p style="color: #27ae60;">Session Live! Waiting for shots...</p>`;
        }

        // Start listening for live shots
        listenForShots(newCode, (shots) => {
            if (feed) {
                feed.innerHTML = ""; // Clear waiting message
                
                // Sort by timestamp (newest first)
                shots.sort((a, b) => (b.timestamp?.seconds || 0) - (a.timestamp?.seconds || 0));

                shots.forEach(shot => {
                    const entry = document.createElement('div');
                    entry.style.padding = "10px";
                    entry.style.borderBottom = "1px solid #eee";
                    
                    const status = shot.made ? "✅ MADE" : "❌ MISS";
                    const color = shot.made ? "#2ecc71" : "#e74c3c";
                    
                    entry.innerHTML = `<strong>Zone ${shot.zone}</strong>: <span style="color: ${color}">${status}</span>`;
                    feed.appendChild(entry);
                });
            }
        });
    } catch (error) {
        console.error("Error creating session:", error);
        display.innerText = "Error Starting Session";
    }
};