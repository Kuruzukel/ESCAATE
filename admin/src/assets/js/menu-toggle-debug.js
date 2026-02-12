/**
 * Debug Menu Toggle - Ensures toggle works on all screens
 * This file adds additional event listeners to guarantee functionality
 */

(function () {
    'use strict';

    console.log('Menu toggle debug script loaded');

    // Wait for DOM to be fully ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initToggle);
    } else {
        initToggle();
    }

    function initToggle() {
        console.log('Initializing menu toggle debug');

        // Find all toggle buttons
        const toggleButtons = document.querySelectorAll('.layout-menu-toggle, .menu-toggle-btn');
        console.log('Found toggle buttons:', toggleButtons.length);

        toggleButtons.forEach((btn, index) => {
            console.log(`Button ${index}:`, btn);

            // Add click handler with high priority
            btn.addEventListener('click', function (e) {
                console.log('Toggle button clicked!');
                e.preventDefault();
                e.stopPropagation();
                e.stopImmediatePropagation();

                const isSmallScreen = window.innerWidth < 1200;
                console.log('Screen width:', window.innerWidth, 'Is small screen:', isSmallScreen);

                if (isSmallScreen) {
                    const html = document.documentElement;
                    const wasExpanded = html.classList.contains('layout-menu-expanded');

                    if (wasExpanded) {
                        html.classList.remove('layout-menu-expanded');
                        console.log('Removed layout-menu-expanded class');
                    } else {
                        html.classList.add('layout-menu-expanded');
                        console.log('Added layout-menu-expanded class');
                    }

                    console.log('Current classes:', html.className);
                } else {
                    const html = document.documentElement;
                    const wasCollapsed = html.classList.contains('layout-menu-collapsed');

                    if (wasCollapsed) {
                        html.classList.remove('layout-menu-collapsed');
                        console.log('Removed layout-menu-collapsed class');
                    } else {
                        html.classList.add('layout-menu-collapsed');
                        console.log('Added layout-menu-collapsed class');
                    }

                    console.log('Current classes:', html.className);
                }
            }, true); // Use capture phase
        });

        // Also check if menu exists
        const menu = document.getElementById('layout-menu');
        console.log('Menu element found:', !!menu);

        if (menu) {
            console.log('Menu current transform:', window.getComputedStyle(menu).transform);
            console.log('Menu current opacity:', window.getComputedStyle(menu).opacity);
        }
    }
})();
