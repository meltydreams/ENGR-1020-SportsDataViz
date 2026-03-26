let currentZone = null;
let shots = [];
let shotCount = 1;

function selectZone(zone) {
    currentZone = zone;
    alert("Selected Zone " + zone);
}

function recordShot(result) {
    if (!currentZone) {
        alert("Select a zone first!");
        return;
    }
    shots.push({
        zone: currentZone,
        result: result
    });

    shotCount++ ;
    document.getElementById("shotNumber").innerText = "Shot " + shotCount;

    console.log(shots) ;
}