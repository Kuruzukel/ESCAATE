/* Performance Fixes for Schedule Page */

// Fix for non-passive event listeners
(function () {
    'use strict';

    // Override addEventListener to make touch events passive by default
    const originalAddEventListener = EventTarget.prototype.addEventListener;
    const passiveEvents = ['touchstart', 'touchmove', 'wheel', 'mousewheel'];

    EventTarget.prototype.addEventListener = function (type, listener, options) {
        if (passiveEvents.includes(type)) {
            if (typeof options === 'boolean') {
                options = {
                    capture: options,
                    passive: true
                };
            } else if (typeof options === 'object' && options !== null) {
                if (options.passive === undefined) {
                    options.passive = true;
                }
            } else {
                options = {
                    passive: true
                };
            }
        }

        return originalAddEventListener.call(this, type, listener, options);
    };

    // Polyfill for passive event listener support detection
    let supportsPassive = false;
    try {
        const opts = Object.defineProperty({}, 'passive', {
            get: function () {
                supportsPassive = true;
                return true;
            }
        });
        window.addEventListener('testPassive', null, opts);
        window.removeEventListener('testPassive', null, opts);
    } catch (e) {
        // Passive not supported
    }

    // Store the support flag globally
    window.supportsPassiveEvents = supportsPassive;

    // Optimize scroll performance
    if (supportsPassive) {
        // Add passive listeners for common scroll events
        const scrollElements = document.querySelectorAll('.layout-menu, .perfect-scrollbar');
        scrollElements.forEach(element => {
            if (element) {
                element.addEventListener('touchstart', function () { }, { passive: true });
                element.addEventListener('touchmove', function () { }, { passive: true });
                element.addEventListener('wheel', function () { }, { passive: true });
            }
        });
    }

    // Debounce function for performance
    function debounce(func, wait, immediate) {
        let timeout;
        return function executedFunction() {
            const context = this;
            const args = arguments;
            const later = function () {
                timeout = null;
                if (!immediate) func.apply(context, args);
            };
            const callNow = immediate && !timeout;
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
            if (callNow) func.apply(context, args);
        };
    }

    // Optimize resize events
    let resizeTimer;
    window.addEventListener('resize', function () {
        clearTimeout(resizeTimer);
        resizeTimer = setTimeout(function () {
            // Trigger any resize-dependent code here
            const event = new Event('optimizedResize');
            window.dispatchEvent(event);
        }, 250);
    }, { passive: true });

    // Optimize scroll events
    let scrollTimer;
    window.addEventListener('scroll', function () {
        clearTimeout(scrollTimer);
        scrollTimer = setTimeout(function () {
            // Trigger any scroll-dependent code here
            const event = new Event('optimizedScroll');
            window.dispatchEvent(event);
        }, 100);
    }, { passive: true });

})();

// Additional performance optimizations
document.addEventListener('DOMContentLoaded', function () {
    // Lazy load images if any
    const images = document.querySelectorAll('img[data-src]');
    if ('IntersectionObserver' in window) {
        const imageObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.src = img.dataset.src;
                    img.classList.remove('lazy');
                    imageObserver.unobserve(img);
                }
            });
        });

        images.forEach(img => imageObserver.observe(img));
    } else {
        // Fallback for browsers without IntersectionObserver
        images.forEach(img => {
            img.src = img.dataset.src;
            img.classList.remove('lazy');
        });
    }

    // Optimize animations
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
    if (prefersReducedMotion.matches) {
        document.body.classList.add('reduce-motion');
    }

    // Add CSS for reduced motion
    if (!document.getElementById('reduce-motion-styles')) {
        const style = document.createElement('style');
        style.id = 'reduce-motion-styles';
        style.textContent = `
            .reduce-motion *,
            .reduce-motion *::before,
            .reduce-motion *::after {
                animation-duration: 0.01ms !important;
                animation-iteration-count: 1 !important;
                transition-duration: 0.01ms !important;
                scroll-behavior: auto !important;
            }
        `;
        document.head.appendChild(style);
    }
});