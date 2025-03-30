let currentMode = 'clock';
let stopwatchInterval;
let timerInterval;
let stopwatchRunning = false;
let stopwatchTime = 0;
let timerTime = 0;

// Mode Switching
document.querySelectorAll('.mode-btn').forEach(btn => {
    btn.addEventListener('click', () => {
        document.querySelectorAll('.mode-btn').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        currentMode = btn.dataset.mode;
        
        document.querySelectorAll('.controls').forEach(c => c.classList.add('hidden'));
        document.body.className = currentMode;
        
        if (currentMode === 'stopwatch') {
            document.querySelector('.stopwatch-controls').classList.remove('hidden');
        } else if (currentMode === 'timer') {
            document.querySelector('.timer-controls').classList.remove('hidden');
        }
    });
});

// Flip Clock Logic
let previousTime = '';
const flipCards = {
    hoursTens: document.querySelector('.hours-tens'),
    hoursOnes: document.querySelector('.hours-ones'),
    minutesTens: document.querySelector('.minutes-tens'),
    minutesOnes: document.querySelector('.minutes-ones'),
    secondsTens: document.querySelector('.seconds-tens'),
    secondsOnes: document.querySelector('.seconds-ones')
};

function updateFlipClock() {
    const now = new Date();
    const timeString = [
        now.getHours().toString().padStart(2, '0'),
        now.getMinutes().toString().padStart(2, '0'),
        now.getSeconds().toString().padStart(2, '0')
    ].join(':');

    if (timeString !== previousTime) {
        const timeDigits = timeString.replace(/:/g, '').split('');
        
        Object.keys(flipCards).forEach((key, index) => {
            const currentDigit = timeDigits[index];
            const card = flipCards[key];
            
            if (card.querySelector('.top').textContent !== currentDigit) {
                card.classList.add('flipping');
                card.querySelector('.top').textContent = currentDigit;
                card.querySelector('.bottom').textContent = currentDigit;
                
                setTimeout(() => {
                    card.classList.remove('flipping');
                }, 1000);
            }
        });
        
        previousTime = timeString;
    }
}

// Stopwatch Logic
document.getElementById('startStopwatch').addEventListener('click', () => {
    if (!stopwatchRunning) {
        stopwatchRunning = true;
        document.getElementById('startStopwatch').textContent = 'Stop';
        stopwatchInterval = setInterval(() => {
            stopwatchTime += 10;
            updateStopwatchDisplay();
        }, 10);
    } else {
        stopwatchRunning = false;
        document.getElementById('startStopwatch').textContent = 'Start';
        clearInterval(stopwatchInterval);
    }
});

document.getElementById('resetStopwatch').addEventListener('click', () => {
    stopwatchTime = 0;
    updateStopwatchDisplay();
    document.getElementById('lapTimes').innerHTML = '';
});

function updateStopwatchDisplay() {
    const hours = Math.floor(stopwatchTime / 3600000);
    const minutes = Math.floor((stopwatchTime % 3600000) / 60000);
    const seconds = Math.floor((stopwatchTime % 60000) / 1000);
    const milliseconds = Math.floor((stopwatchTime % 1000) / 10);
    
    document.querySelector('.flip-clock').textContent = 
        `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:` +
        `${seconds.toString().padStart(2, '0')}.${milliseconds.toString().padStart(2, '0')}`;
}

// Timer Logic
document.getElementById('startTimer').addEventListener('click', () => {
    const hours = parseInt(document.getElementById('timerHours').value) || 0;
    const minutes = parseInt(document.getElementById('timerMinutes').value) || 0;
    const seconds = parseInt(document.getElementById('timerSeconds').value) || 0;
    
    timerTime = (hours * 3600) + (minutes * 60) + seconds;
    
    if (timerTime > 0) {
        timerInterval = setInterval(() => {
            timerTime--;
            
            if (timerTime <= 0) {
                clearInterval(timerInterval);
                alert('Timer Complete!');
            }
            
            updateTimerDisplay();
        }, 1000);
    }
});

document.getElementById('resetTimer').addEventListener('click', () => {
    clearInterval(timerInterval);
    timerTime = 0;
    updateTimerDisplay();
});

function updateTimerDisplay() {
    const hours = Math.floor(timerTime / 3600);
    const minutes = Math.floor((timerTime % 3600) / 60);
    const seconds = timerTime % 60;
    
    document.querySelector('.flip-clock').textContent = 
        `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:` +
        `${seconds.toString().padStart(2, '0')}`;
}

// Fullscreen Function
document.getElementById('fullscreenBtn').addEventListener('click', () => {
    if (!document.fullscreenElement) {
        document.documentElement.requestFullscreen();
    } else {
        document.exitFullscreen();
    }
});

// Initialize Clock
setInterval(() => {
    if (currentMode === 'clock') {
        updateFlipClock();
    }
}, 1000);
