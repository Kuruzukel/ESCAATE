/* Courses specific JavaScript */

// Handle enroll button clicks
document.addEventListener('DOMContentLoaded', function () {
    document.querySelectorAll('.enroll-course-btn').forEach(btn => {
        btn.addEventListener('click', function () {
            const card = this.closest('.card');
            const courseTitle = card.querySelector('.card-title').textContent;

            alert(`Enrollment request submitted for: ${courseTitle}`);

            // Update button state
            this.disabled = true;
            this.innerHTML = '<i class="bx bx-check"></i> Enrolled';
            this.classList.remove('btn-primary');
            this.classList.add('btn-success');
        });
    });

    // Menu Toggle Script
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