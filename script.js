// Main Clock
function updateClock() {
    const now = new Date();
    const timeString = now.toLocaleTimeString('en-US', { 
        hour12: false,
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit'
    });
    document.getElementById('clock').textContent = timeString;
}

// Spotify Integration
const spotifyPlaylists = {
    work: '37i9dQZF1DX5trt9i14X7j',
    workout: '37i9dQZF1DX70RN3TfWWJh',
    lecture: '37i9dQZF1DWZeKCadgRdKQ'
};

function loadSpotifyPlaylist(mode) {
    const iframe = document.getElementById('spotifyIFrame');
    iframe.src = `https://open.spotify.com/embed/playlist/${spotifyPlaylists[mode]}?utm_source=generator`;
}

// Activity Modes
document.querySelectorAll('.mode-btn').forEach(btn => {
    btn.addEventListener('click', () => {
        const mode = btn.dataset.mode;
        document.body.className = mode;
        loadSpotifyPlaylist(mode);
    });
});

// World Clocks
let worldClocks = [];

function updateWorldClocks() {
    worldClocks.forEach(clock => {
        const options = {
            timeZone: clock.timezone,
            hour: '2-digit',
            minute: '2-digit',
            second: '2-digit',
            hour12: false
        };
        clock.element.textContent = new Date().toLocaleTimeString('en-US', options) + 
                                  ` ${clock.timezone.split('/')[1]}`;
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
        worldClocks = worldClocks.filter(c => c.element !== clockElement);
        clockElement.remove();
    });

    worldClocks.push({
        timezone: timezone,
        element: clockElement.querySelector('.clock-text')
    });

    document.getElementById('worldClocksContainer').appendChild(clockElement);
});

// Fullscreen
document.getElementById('fullscreenBtn').addEventListener('click', () => {
    if (!document.fullscreenElement) {
        document.documentElement.requestFullscreen();
        this.innerHTML = '<i class="fas fa-compress"></i>';
    } else {
        document.exitFullscreen();
        this.innerHTML = '<i class="fas fa-expand"></i>';
    }
});

// Social Sharing
document.querySelectorAll('.social-btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
        e.preventDefault();
        const text = encodeURIComponent(`Check out this Smart Clock: ${document.querySelector('meta[property="og:description"]').content}`);
        const url = encodeURIComponent(window.location.href);
        
        let shareUrl;
        if (btn.classList.contains('twitter')) {
            shareUrl = `https://twitter.com/intent/tweet?text=${text}&url=${url}`;
        } else if (btn.classList.contains('facebook')) {
            shareUrl = `https://www.facebook.com/sharer/sharer.php?u=${url}`;
        } else if (btn.classList.contains('linkedin')) {
            shareUrl = `https://www.linkedin.com/shareArticle?mini=true&url=${url}&title=${text}`;
        }
        
        window.open(shareUrl, '_blank', 'width=600,height=400');
    });
});

// Initialize
setInterval(() => {
    updateClock();
    updateWorldClocks();
}, 1000);
loadSpotifyPlaylist('work'); // Default playlist
