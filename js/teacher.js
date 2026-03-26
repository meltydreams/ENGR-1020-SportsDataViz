let zoneStats = {
    1: 80,
    2: 60,
    3: 40,
    4: 20,
    5: 75,
    6: 50
};

function getColor(percent) {
    if (percent > 75) return "green";
    if (percent > 50) return "yellow";
    if (percent > 25) return "orange";
    return "red";
}

for (let zone in zoneStats) {
    let element = document.getElementById("zone" + zone);
    element.style.backgroundColor = getColor(zoneStats[zone]);
}