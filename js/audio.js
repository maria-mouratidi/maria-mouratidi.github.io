// This file contains JavaScript functions for handling audio playback for click and hover sounds.

const audioFiles = {
    click: new Audio('assets/sounds/click.mp3'),
    hover: new Audio('assets/sounds/hover.mp3')
};

function playClickSound() {
    audioFiles.click.currentTime = 0; // Reset to start
    audioFiles.click.play();
}

function playHoverSound() {
    audioFiles.hover.currentTime = 0; // Reset to start
    audioFiles.hover.play();
}

// Event listeners for buttons and links
document.querySelectorAll('button').forEach(button => {
    button.addEventListener('click', playClickSound);
});

document.querySelectorAll('a').forEach(link => {
    link.addEventListener('mouseenter', playHoverSound);
});