/**
 * Custom Menu Toggle Script
 * Handles overlay click to close menu on mobile
 */

(function () {
    'use strict';

    // Wait for DOM to be ready
    document.addEventListener('DOMContentLoaded', function () {
        const layoutOverlay = document.querySelector('.layout-overlay');

        // Toggle menu when clicking overlay (for mobile/tablet screens)
        if (layoutOverlay) {
            layoutOverlay.addEventListener('click', function (e) {
                e.preventDefault();
                e.stopPropagation();

                // Use the Helpers toggleCollapsed method to close menu
                if (window.Helpers && typeof window.Helpers.toggleCollapsed === 'function') {
                    window.Helpers.toggleCollapsed();
                }
            });
        }
    });
})();
