/* Attendance specific JavaScript */

// Sample enrolled courses
const enrolledCourses = [
    { id: 1, name: 'Beauty Care (Skin Care) NC II' },
    { id: 2, name: 'Beauty Care (Nail Care) NC II' },
    { id: 3, name: 'Aesthetic Services Level II' }
];

let selectedCourseId = null;

// Initialize courses
function initializeCourses() {
    const container = document.getElementById('coursesContainer');
    container.innerHTML = '';

    enrolledCourses.forEach(course => {
        const col = document.createElement('div');
        col.className = 'col-md-6 col-lg-4 mb-3';
        col.innerHTML = `
            <div class="card course-selector" onclick="selectCourse(${course.id}, '${course.name}')">
                <div class="card-body">
                    <div class="d-flex align-items-center">
                        <i class="bx bx-book" style="font-size: 1.5rem; color: #3b82f6; margin-right: 1rem;"></i>
                        <div>
                            <h6 class="mb-0">${course.name}</h6>
                        </div>
                    </div>
                </div>
            </div>
        `;
        container.appendChild(col);
    });
}

// Select course
function selectCourse(courseId, courseName) {
    selectedCourseId = courseId;
    document.getElementById('selectedCourseTitle').textContent = courseName;
    document.getElementById('attendanceForm').style.display = 'block';

    // Update active state
    document.querySelectorAll('.course-selector').forEach(el => {
        el.classList.remove('active');
    });
    event.currentTarget.classList.add('active');

    // Scroll to form
    document.getElementById('attendanceForm').scrollIntoView({ behavior: 'smooth' });
}

// Image upload handling
function handleImageUpload(file) {
    if (file.size > 5 * 1024 * 1024) {
        alert('File size must be less than 5MB');
        return;
    }

    const reader = new FileReader();
    reader.onload = (e) => {
        const imagePreview = document.getElementById('imagePreview');
        imagePreview.src = e.target.result;
        imagePreview.style.display = 'block';
    };
    reader.readAsDataURL(file);
}

// Initialize on page load
document.addEventListener('DOMContentLoaded', function () {
    initializeCourses();

    const uploadArea = document.getElementById('uploadArea');
    const imageInput = document.getElementById('imageInput');
    const imagePreview = document.getElementById('imagePreview');

    uploadArea.addEventListener('click', () => imageInput.click());

    uploadArea.addEventListener('dragover', (e) => {
        e.preventDefault();
        uploadArea.classList.add('dragover');
    });

    uploadArea.addEventListener('dragleave', () => {
        uploadArea.classList.remove('dragover');
    });

    uploadArea.addEventListener('drop', (e) => {
        e.preventDefault();
        uploadArea.classList.remove('dragover');
        const files = e.dataTransfer.files;
        if (files.length > 0) {
            handleImageUpload(files[0]);
        }
    });

    imageInput.addEventListener('change', (e) => {
        if (e.target.files.length > 0) {
            handleImageUpload(e.target.files[0]);
        }
    });

    // Form submission
    document.getElementById('attendanceFormElement').addEventListener('submit', (e) => {
        e.preventDefault();
        const date = document.getElementById('attendanceDate').value;
        const time = document.getElementById('attendanceTime').value;
        const notes = document.getElementById('notes').value;

        if (!date || !time) {
            alert('Please fill in all required fields');
            return;
        }

        alert(`Attendance submitted for course ID ${selectedCourseId}\nDate: ${date}\nTime: ${time}`);
        // Reset form
        document.getElementById('attendanceFormElement').reset();
        imagePreview.style.display = 'none';
    });

    // Cancel button
    document.getElementById('cancelBtn').addEventListener('click', () => {
        document.getElementById('attendanceForm').style.display = 'none';
        document.getElementById('attendanceFormElement').reset();
        imagePreview.style.display = 'none';
        document.querySelectorAll('.course-selector').forEach(el => {
            el.classList.remove('active');
        });
    });
});