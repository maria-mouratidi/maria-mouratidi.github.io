// This file contains the main JavaScript functionality for the portfolio, including event listeners and DOM manipulation.

document.addEventListener('DOMContentLoaded', () => {
    // Initialize event listeners
    setupEventListeners();
});

function setupEventListeners() {
    const projectCards = document.querySelectorAll('.project-card');
    projectCards.forEach(card => {
        card.addEventListener('click', () => {
            playClickSound();
            // Add functionality to handle project card click
            alert('Project card clicked!');
        });
    });

    const links = document.querySelectorAll('a');
    links.forEach(link => {
        link.addEventListener('mouseover', playHoverSound);
    });
}

function playClickSound() {
    const clickSound = new Audio('assets/sounds/click.mp3');
    clickSound.play();
}

function playHoverSound() {
    const hoverSound = new Audio('assets/sounds/hover.mp3');
    hoverSound.play();
}