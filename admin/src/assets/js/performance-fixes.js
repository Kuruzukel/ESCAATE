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

    // Batch DOM reads and writes to prevent forced reflows
    const rafScheduler = {
        reads: [],
        writes: [],
        scheduled: false,

        scheduleRead: function (callback) {
            this.reads.push(callback);
            this.schedule();
        },

        scheduleWrite: function (callback) {
            this.writes.push(callback);
            this.schedule();
        },

        schedule: function () {
            if (this.scheduled) return;
            this.scheduled = true;

            requestAnimationFrame(() => {
                // Execute all reads first
                const reads = this.reads.slice();
                this.reads = [];
                reads.forEach(fn => fn());

                // Then execute all writes
                const writes = this.writes.slice();
                this.writes = [];
                writes.forEach(fn => fn());

                this.scheduled = false;
            });
        }
    };

    // Make scheduler available globally
    window.rafScheduler = rafScheduler;

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

    // Throttle function for performance
    function throttle(func, limit) {
        let inThrottle;
        return function () {
            const args = arguments;
            const context = this;
            if (!inThrottle) {
                func.apply(context, args);
                inThrottle = true;
                setTimeout(() => inThrottle = false, limit);
            }
        };
    }

    // Make utilities available globally
    window.debounce = debounce;
    window.throttle = throttle;

    // Optimize resize events
    let resizeTimer;
    window.addEventListener('resize', throttle(function () {
        // Trigger any resize-dependent code here
        const event = new Event('optimizedResize');
        window.dispatchEvent(event);
    }, 250), { passive: true });

    // Optimize scroll events
    window.addEventListener('scroll', throttle(function () {
        // Trigger any scroll-dependent code here
        const event = new Event('optimizedScroll');
        window.dispatchEvent(event);
    }, 100), { passive: true });

})();

// Additional performance optimizations
document.addEventListener('DOMContentLoaded', function () {
    // Use requestAnimationFrame for layout-dependent operations
    requestAnimationFrame(() => {
        // Batch any initial layout calculations here
        const layoutMenu = document.getElementById('layout-menu');
        if (layoutMenu) {
            // Cache layout properties to avoid repeated reflows
            layoutMenu.dataset.cachedHeight = layoutMenu.offsetHeight;
            layoutMenu.dataset.cachedWidth = layoutMenu.offsetWidth;
        }
    });

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

    // Optimize font loading
    if ('fonts' in document) {
        document.fonts.ready.then(() => {
            document.body.classList.add('fonts-loaded');
        });
    }

    // Use CSS containment for better performance
    const cards = document.querySelectorAll('.card');
    cards.forEach(card => {
        card.style.contain = 'layout style paint';
    });
});

// Prevent layout thrashing during animations
if (window.requestIdleCallback) {
    requestIdleCallback(() => {
        // Perform non-critical work during idle time
        const nonCriticalElements = document.querySelectorAll('[data-lazy-init]');
        nonCriticalElements.forEach(el => {
            // Initialize non-critical components
            if (el.dataset.lazyInit) {
                const initFn = window[el.dataset.lazyInit];
                if (typeof initFn === 'function') {
                    initFn(el);
                }
            }
        });
    });
}
