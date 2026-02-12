/**
 * Custom Menu Toggle Script
 * Handles menu toggle on ALL screen sizes
 * Works across all admin pages
 */

(function () {
    'use strict';

    // Wait for DOM to be ready
    document.addEventListener('DOMContentLoaded', function () {
        const layoutOverlay = document.querySelector('.layout-overlay');
        const menuToggleBtn = document.querySelector('.menu-toggle-btn');
        const menuCloseBtn = document.querySelector('.menu-close-btn');

        // Function to check if we're on a small screen
        function isSmallScreen() {
            return window.innerWidth < 1200;
        }

        // Function to close menu
        function closeMenu() {
            document.documentElement.classList.remove('layout-menu-expanded');
            document.documentElement.classList.remove('layout-menu-collapsed');
        }

        // Toggle menu when clicking the hamburger button
        if (menuToggleBtn) {
            menuToggleBtn.addEventListener('click', function (e) {
                e.preventDefault();
                e.stopPropagation();

                if (isSmallScreen()) {
                    // On small screens, toggle expanded class
                    document.documentElement.classList.toggle('layout-menu-expanded');
                } else {
                    // On large screens, toggle collapsed class
                    document.documentElement.classList.toggle('layout-menu-collapsed');
                }
            });
        }

        // Close button functionality
        if (menuCloseBtn) {
            menuCloseBtn.addEventListener('click', function (e) {
                e.preventDefault();
                e.stopPropagation();
                closeMenu();
            });
        }

        // Close menu when clicking overlay
        if (layoutOverlay) {
            layoutOverlay.addEventListener('click', function (e) {
                e.preventDefault();
                e.stopPropagation();
                closeMenu();
            });
        }

        // Handle window resize - adjust classes appropriately
        function handleResize() {
            if (isSmallScreen()) {
                // On small screens, remove collapsed class
                document.documentElement.classList.remove('layout-menu-collapsed');
            } else {
                // On large screens, remove expanded class
                document.documentElement.classList.remove('layout-menu-expanded');
            }
        }

        // Listen for window resize
        window.addEventListener('resize', handleResize);

        // Initial check
        handleResize();
    });
})();
