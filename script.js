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
