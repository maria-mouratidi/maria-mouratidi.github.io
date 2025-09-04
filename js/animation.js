// This file contains JavaScript functions for triggering animations based on user interactions.

document.addEventListener('DOMContentLoaded', () => {
    const elementsToAnimate = document.querySelectorAll('.animate');

    elementsToAnimate.forEach(element => {
        element.addEventListener('mouseover', () => {
            element.classList.add('animated');
            playHoverSound();
        });

        element.addEventListener('mouseout', () => {
            element.classList.remove('animated');
        });

        element.addEventListener('click', () => {
            playClickSound();
            // Add any additional click animation logic here
        });
    });
});

function playHoverSound() {
    const hoverSound = new Audio('../assets/sounds/hover.mp3');
    hoverSound.play();
}

function playClickSound() {
    const clickSound = new Audio('../assets/sounds/click.mp3');
    clickSound.play();
}