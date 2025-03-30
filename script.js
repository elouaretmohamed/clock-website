// Clock Function
function updateClock() {
    const now = new Date();
    const hours = now.getHours().toString().padStart(2, '0');
    const minutes = now.getMinutes().toString().padStart(2, '0');
    const seconds = now.getSeconds().toString().padStart(2, '0');
    document.getElementById('clock').textContent = `${hours}:${minutes}:${seconds}`;
}

// Alarm System
let alarms = [];

function checkAlarms() {
    const now = new Date();
    const currentTime = now.getHours() * 3600 + now.getMinutes() * 60 + now.getSeconds();
    
    alarms.forEach((alarm, index) => {
        if (currentTime === alarm.time) {
            alert(`ALARM: ${alarm.displayTime}`);
            alarms.splice(index, 1);
            updateAlarmList();
        }
    });
}

function updateAlarmList() {
    const list = document.getElementById('alarmList');
    list.innerHTML = alarms.map(alarm => `
        <div class="alarm-item">
            <span>${alarm.displayTime}</span>
            <button onclick="deleteAlarm(${alarm.id})">Delete</button>
        </div>
    `).join('');
}

let alarmId = 0;
document.getElementById('setAlarm').addEventListener('click', () => {
    const hr = parseInt(document.getElementById('alarmHr').value) || 0;
    const min = parseInt(document.getElementById('alarmMin').value) || 0;
    const sec = parseInt(document.getElementById('alarmSec').value) || 0;
    
    const totalSeconds = hr * 3600 + min * 60 + sec;
    const displayTime = [
        hr.toString().padStart(2, '0'),
        min.toString().padStart(2, '0'),
        sec.toString().padStart(2, '0')
    ].join(':');
    
    alarms.push({
        id: alarmId++,
        time: totalSeconds,
        displayTime: displayTime
    });
    
    updateAlarmList();
});

function deleteAlarm(id) {
    alarms = alarms.filter(alarm => alarm.id !== id);
    updateAlarmList();
}

// Fullscreen Function
document.getElementById('fullscreenBtn').addEventListener('click', () => {
    if (!document.fullscreenElement) {
        document.documentElement.requestFullscreen();
    } else {
        document.exitFullscreen();
    }
});

// Initialize
setInterval(() => {
    updateClock();
    checkAlarms();
}, 1000);
