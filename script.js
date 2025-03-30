// Clock Function
function updateClock() {
    const now = new Date();
    const hours = now.getHours().toString().padStart(2, '0');
    const minutes = now.getMinutes().toString().padStart(2, '0');
    const seconds = now.getSeconds().toString().padStart(2, '0');
    document.getElementById('clock').textContent = 
        `${hours}:${minutes}:${seconds}`;
}

setInterval(updateClock, 1000);

// Fullscreen Function
document.getElementById('fullscreenBtn').addEventListener('click', () => {
    if (!document.fullscreenElement) {
        document.documentElement.requestFullscreen();
        document.getElementById('fullscreenBtn').innerHTML = '<i class="fas fa-compress"></i>';
    } else {
        document.exitFullscreen();
        document.getElementById('fullscreenBtn').innerHTML = '<i class="fas fa-expand"></i>';
    }
});

// Background Changer
document.querySelectorAll('.bg-btn').forEach(button => {
    button.addEventListener('click', () => {
        const newBg = button.dataset.bg;
        document.body.style.background = newBg;
    });
});

// Social Media Sharing
const shareText = `Check out this awesome clock! Current time: ${new Date().toLocaleTimeString()}`;

document.querySelectorAll('.social-btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
        e.preventDefault();
        const platform = btn.id;
        let url = '';
        
        switch(platform) {
            case 'twitter':
                url = `https://twitter.com/intent/tweet?text=${encodeURIComponent(shareText)}`;
                break;
            case 'facebook':
                url = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(window.location.href)}`;
                break;
            case 'linkedin':
                url = `https://www.linkedin.com/shareArticle?mini=true&url=${encodeURIComponent(window.location.href)}&title=${encodeURIComponent(shareText)}`;
                break;
        }
        
        window.open(url, '_blank');
    });
});
// Spotify Integration
function updateSpotifyPlaylist(mode) {
    const playlists = {
        work: '37i9dQZF1DX5trt9i14X7j?si=1a2b3c4d5e',
        workout: '37i9dQZF1DX70RN3TfWWJh?si=6f7g8h9i0j',
        lecture: '37i9dQZF1DWZeKCadgRdKQ?si=k1l2m3n4o5'
    };
    
    const iframe = document.getElementById('spotifyIFrame');
    iframe.src = `https://open.spotify.com/embed/playlist/${playlists[mode]}?utm_source=generator`;
}

// Activity Modes
document.querySelectorAll('.mode-btn').forEach(btn => {
    btn.addEventListener('click', () => {
        const mode = btn.dataset.mode;
        document.body.className = mode;
        updateSpotifyPlaylist(mode);
        
        // Update background based on mode
        const colors = {
            work: '#2c3e50',
            workout: '#e55039',
            lecture: '#1e3799'
        };
        document.body.style.background = colors[mode];
    });
});

// World Clocks
let clocks = [];

function updateWorldClocks() {
    const now = new Date();
    clocks.forEach(clock => {
        const options = {
            timeZone: clock.timezone,
            hour: '2-digit',
            minute: '2-digit',
            second: '2-digit'
        };
        clock.element.textContent = new Intl.DateTimeFormat('en-US', options).format(now) + 
                                  ` (${clock.timezone.split('/')[1]})`;
    });
}

document.getElementById('addClockBtn').addEventListener('click', () => {
    const timezone = document.getElementById('timezoneSelect').value;
    if (timezone === 'auto') return;
    
    const clockElement = document.createElement('div');
    clockElement.className = 'world-clock-item';
    clockElement.innerHTML = `
        <span class="clock-text"></span>
        <span class="remove-clock">×</span>
    `;
    
    clockElement.querySelector('.remove-clock').addEventListener('click', () => {
        clocks = clocks.filter(c => c.element !== clockElement);
        clockElement.remove();
    });
    
    clocks.push({
        timezone: timezone,
        element: clockElement.querySelector('.clock-text')
    });
    
    document.getElementById('worldClocksContainer').appendChild(clockElement);
});

// Update all clocks every second
setInterval(() => {
    updateClock();
    updateWorldClocks();
}, 1000);
