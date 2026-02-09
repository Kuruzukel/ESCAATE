/* Menu Toggle Script for Enrollment Page */
document.addEventListener('DOMContentLoaded', function () {
    const menuToggleBtn = document.querySelector('.menu-toggle-btn');
    const layoutMenu = document.getElementById('layout-menu');
    const layoutOverlay = document.querySelector('.layout-overlay');
    const layoutContainer = document.querySelector('.layout-container');

    if (menuToggleBtn && layoutMenu) {
        menuToggleBtn.addEventListener('click', function (e) {
            e.preventDefault();
            layoutMenu.classList.toggle('menu-hidden');

            // Toggle class on layout container to expand content
            if (layoutContainer) {
                layoutContainer.classList.toggle('menu-collapsed');
            }
        });
    }

    // Also toggle when clicking the overlay
    if (layoutOverlay && layoutMenu) {
        layoutOverlay.addEventListener('click', function () {
            layoutMenu.classList.toggle('menu-hidden');

            // Toggle class on layout container
            if (layoutContainer) {
                layoutContainer.classList.toggle('menu-collapsed');
            }
        });
    }
});