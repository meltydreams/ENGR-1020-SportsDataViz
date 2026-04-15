//authors: Cihangir Piskin, Drew Tedesco, Ali Sheikh
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
            const stats = {
                zone1: { made: 0, total: 0 },
                zone2: { made: 0, total: 0 },
                zone3: { made: 0, total: 0 },
                zone4: { made: 0, total: 0 },
                zone5: { made: 0, total: 0 },
                zone6: { made: 0, total: 0 }
            };
            shots.forEach(shot => {
                const zoneKey = shot.zone;
                if (stats[zoneKey]) {
                    stats[zoneKey].total++; //increment total shots for the zone
                    if (shot.made) stats[zoneKey].made++; //also increment made shots if it was made
                }});
            for (let i = 1; i <= 6; i++) {
                const zoneKey = `zone${i}`;
                const zoneElement = document.getElementById(`hz${i}`);
                if(!zoneElement) continue;
                const zoneStats = stats[zoneKey];

                if(zoneStats.total > 0){
                    const percent = Math.round ((zoneStats.made / zoneStats.total) * 100);
                    zoneElement.innerHTML = `<div class="heat-label"><span>${zoneStats.made}/${zoneStats.total}</span><span>${percent}%</span></div>`;
                    if (percent >= 75) zoneElement.style.backgroundColor = 'rgba(39, 174, 96, 0.7)'; //green for 75%+
                    else if (percent >= 50) zoneElement.style.backgroundColor = 'rgba(241, 196, 15, 0.7)'; //yellow for 50-74%
                    else if (percent >= 25) zoneElement.style.backgroundColor = 'rgba(230, 126, 34, 0.7)'; //orange for 25-49% 
                    else zoneElement.style.backgroundColor = 'rgba(192, 57, 43, 0.7)'; //red for 0-24%
                }
                else{
                    zoneElement.innerHTML = "";
                    zoneElement.style.backgroundColor = 'rgba(189, 195, 199, 0.3)'; //gray for no data
                }
            }   
        });
    } catch (error) {
        console.error("Error creating session:", error);
        display.innerText = "Error Starting Session";
    }
}