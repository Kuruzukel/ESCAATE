// Audit Inventory JavaScript

document.addEventListener('DOMContentLoaded', function () {
    console.log('Audit Inventory page loaded');

    // Initialize any audit inventory specific functionality here
    initializeAuditInventory();
});

function initializeAuditInventory() {
    // Add audit inventory specific initialization code
    console.log('Audit Inventory initialized');
}

// Edit Equipment Function
function editEquipment(element) {
    const row = element.closest('tr');
    const cells = row.querySelectorAll('td');

    const equipmentName = cells[0].textContent.trim();
    const specification = cells[1].textContent.trim();
    const quantityRequired = cells[2].textContent.trim();
    const quantityOnSite = cells[3].textContent.trim();
    const difference = cells[4].textContent.trim();
    const remarks = cells[5].textContent.trim();

    // Create modal for editing
    const modalHTML = `
        <div class="modal fade" id="editEquipmentModal" tabindex="-1" aria-hidden="true">
            <div class="modal-dialog modal-dialog-centered modal-lg">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title">Edit Equipment</h5>
                        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div class="modal-body">
                        <form id="editEquipmentForm">
                            <div class="row">
                                <div class="col-md-6">
                                    <div class="mb-3">
                                        <label class="form-label">Equipment Name</label>
                                        <input type="text" class="form-control" id="editEquipmentName" value="${equipmentName}">
                                    </div>
                                    <div class="mb-3">
                                        <label class="form-label">Specification</label>
                                        <input type="text" class="form-control" id="editSpecification" value="${specification}">
                                    </div>
                                    <div class="mb-3">
                                        <label class="form-label">Quantity Required</label>
                                        <input type="text" class="form-control" id="editQuantityRequired" value="${quantityRequired}">
                                    </div>
                                </div>
                                <div class="col-md-6">
                                    <div class="mb-3">
                                        <label class="form-label">Quantity On Site</label>
                                        <input type="text" class="form-control" id="editQuantityOnSite" value="${quantityOnSite}">
                                    </div>
                                    <div class="mb-3">
                                        <label class="form-label">Difference</label>
                                        <input type="text" class="form-control" id="editDifference" value="${difference}">
                                        <small class="text-muted">Format: OnSite/Difference (e.g., 3/0 or 2/-1)</small>
                                    </div>
                                    <div class="mb-3">
                                        <label class="form-label">Inspector's Remarks</label>
                                        <textarea class="form-control" id="editRemarks" rows="3">${remarks}</textarea>
                                    </div>
                                </div>
                            </div>
                        </form>
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cancel</button>
                        <button type="button" class="btn btn-primary" onclick="saveEquipmentChanges(this)">Save Changes</button>
                    </div>
                </div>
            </div>
        </div>
    `;

    // Remove existing modal if any
    const existingModal = document.getElementById('editEquipmentModal');
    if (existingModal) {
        existingModal.remove();
    }

    // Add modal to body
    document.body.insertAdjacentHTML('beforeend', modalHTML);

    // Show modal
    const modal = new bootstrap.Modal(document.getElementById('editEquipmentModal'));
    modal.show();

    // Store row reference for saving
    document.getElementById('editEquipmentModal').dataset.rowIndex = Array.from(row.parentNode.children).indexOf(row);
}

// Save Equipment Changes
function saveEquipmentChanges(button) {
    const modal = document.getElementById('editEquipmentModal');
    const rowIndex = modal.dataset.rowIndex;
    const tbody = document.querySelector('.table tbody');
    const row = tbody.children[rowIndex];
    const cells = row.querySelectorAll('td');

    // Get updated values
    const newName = document.getElementById('editEquipmentName').value;
    const newSpec = document.getElementById('editSpecification').value;
    const newQtyRequired = document.getElementById('editQuantityRequired').value;
    const newQtyOnSite = document.getElementById('editQuantityOnSite').value;
    const newDifference = document.getElementById('editDifference').value;

    // Update row
    cells[0].innerHTML = `<strong>${newName}</strong>`;
    cells[1].textContent = newSpec;
    cells[2].textContent = newQtyRequired;
    cells[3].textContent = newQtyOnSite;
    cells[4].textContent = newDifference;

    // Parse difference to determine badge
    // Expected format: "number/+number" or "number/-number" or "number/0"
    let badgeClass = 'bg-success';
    let badgeText = 'Compliant';

    const diffParts = newDifference.split('/');
    if (diffParts.length === 2) {
        const diffValue = parseInt(diffParts[1]);
        if (diffValue < 0) {
            badgeClass = 'bg-warning';
            badgeText = 'Low Stock';
        } else if (diffValue > 0) {
            badgeClass = 'bg-info';
            badgeText = 'Excess';
        }
    }

    cells[5].innerHTML = `<span class="badge ${badgeClass}">${badgeText}</span>`;

    // Close modal
    bootstrap.Modal.getInstance(modal).hide();

    // Show success message
    alert('Equipment updated successfully!');
}

// Delete Equipment Function
function deleteEquipment(element) {
    const row = element.closest('tr');
    const cells = row.querySelectorAll('td');
    const equipmentName = cells[0].textContent.trim();

    // Create confirmation modal
    const modalHTML = `
        <div class="modal fade" id="deleteEquipmentModal" tabindex="-1" aria-hidden="true">
            <div class="modal-dialog modal-dialog-centered">
                <div class="modal-content">
                    <div class="modal-header bg-danger text-white">
                        <h5 class="modal-title">Confirm Delete</h5>
                        <button type="button" class="btn-close btn-close-white" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div class="modal-body">
                        <div class="text-center mb-3">
                            <i class="bx bx-error-circle text-danger" style="font-size: 4rem;"></i>
                        </div>
                        <p class="text-center mb-0">Are you sure you want to delete <strong>${equipmentName}</strong>?</p>
                        <p class="text-center text-muted small">This action cannot be undone.</p>
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cancel</button>
                        <button type="button" class="btn btn-danger" onclick="confirmDeleteEquipment(this)">Delete</button>
                    </div>
                </div>
            </div>
        </div>
    `;

    // Remove existing modal if any
    const existingModal = document.getElementById('deleteEquipmentModal');
    if (existingModal) {
        existingModal.remove();
    }

    // Add modal to body
    document.body.insertAdjacentHTML('beforeend', modalHTML);

    // Show modal
    const modal = new bootstrap.Modal(document.getElementById('deleteEquipmentModal'));
    modal.show();

    // Store row reference for deletion
    document.getElementById('deleteEquipmentModal').dataset.rowIndex = Array.from(row.parentNode.children).indexOf(row);
}

// Confirm Delete Equipment
function confirmDeleteEquipment(button) {
    const modal = document.getElementById('deleteEquipmentModal');
    const rowIndex = modal.dataset.rowIndex;
    const tbody = document.querySelector('.table tbody');
    const row = tbody.children[rowIndex];
    const equipmentName = row.querySelector('td').textContent.trim();

    // Remove the row
    row.remove();

    // Close modal
    bootstrap.Modal.getInstance(modal).hide();

    // Show success message
    alert(`${equipmentName} has been deleted successfully!`);
}

// View Details Function
function viewDetails(element) {
    const row = element.closest('tr');
    const cells = row.querySelectorAll('td');

    const equipmentName = cells[0].textContent.trim();
    const specification = cells[1].textContent.trim();
    const quantityRequired = cells[2].textContent.trim();
    const quantityOnSite = cells[3].textContent.trim();
    const difference = cells[4].textContent.trim();
    const remarks = cells[5].textContent.trim();

    // Create modal for viewing details
    const modalHTML = `
        <div class="modal fade" id="viewDetailsModal" tabindex="-1" aria-hidden="true">
            <div class="modal-dialog modal-dialog-centered modal-lg">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title">Equipment Details</h5>
                        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div class="modal-body">
                        <div class="row mb-3">
                            <div class="col-md-6">
                                <h6 class="text-muted mb-2">Equipment Name</h6>
                                <p class="fw-bold">${equipmentName}</p>
                            </div>
                            <div class="col-md-6">
                                <h6 class="text-muted mb-2">Specification</h6>
                                <p>${specification}</p>
                            </div>
                        </div>
                        <div class="row mb-3">
                            <div class="col-md-4">
                                <h6 class="text-muted mb-2">Quantity Required</h6>
                                <p class="fw-bold">${quantityRequired}</p>
                            </div>
                            <div class="col-md-4">
                                <h6 class="text-muted mb-2">Quantity On Site</h6>
                                <p class="fw-bold">${quantityOnSite}</p>
                            </div>
                            <div class="col-md-4">
                                <h6 class="text-muted mb-2">Difference</h6>
                                <p class="fw-bold">${difference}</p>
                            </div>
                        </div>
                        <div class="row mb-3">
                            <div class="col-12">
                                <h6 class="text-muted mb-2">Inspector's Remarks</h6>
                                <p>${remarks}</p>
                            </div>
                        </div>
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                    </div>
                </div>
            </div>
        </div>
    `;

    // Remove existing modal if any
    const existingModal = document.getElementById('viewDetailsModal');
    if (existingModal) {
        existingModal.remove();
    }

    // Add modal to body
    document.body.insertAdjacentHTML('beforeend', modalHTML);

    // Show modal
    const modal = new bootstrap.Modal(document.getElementById('viewDetailsModal'));
    modal.show();
}
