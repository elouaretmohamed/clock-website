// Flip Clock Animation
const flipCards = document.querySelectorAll('.flip-card');
let previousTime = '';

function updateClock() {
    const now = new Date();
    const hours = now.getHours().toString().padStart(2, '0');
    const minutes = now.getMinutes().toString().padStart(2, '0');
    const seconds = now.getSeconds().toString().padStart(2, '0');
    const timeString = hours + minutes + seconds;

    if (timeString !== previousTime) {
        const digits = timeString.split('');
        
        flipCards.forEach((card, index) => {
            const currentDigit = digits[index];
            const top = card.querySelector('.top');
            const bottom = card.querySelector('.bottom');
            
            if (top.textContent !== currentDigit) {
                card.classList.add('flipping');
                top.textContent = currentDigit;
                bottom.textContent = currentDigit;
                
                setTimeout(() => {
                    card.classList.remove('flipping');
                }, 1000);
            }
        });
        
        previousTime = timeString;
    }
}

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

// Initialize
setInterval(updateClock, 1000);
