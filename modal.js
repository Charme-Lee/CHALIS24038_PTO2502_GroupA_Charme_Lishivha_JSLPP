import { addNewTask, updateTask, deleteTask } from "./tasks.js";

// Tracks the currently selected task ID for edit/delete operations
let currentTaskId = null;

// Delete confirmation modal
const deleteModalBackdrop = document.getElementById("delete-modal-backdrop");
const confirmDeleteBtn = document.getElementById("confirm-delete-btn");
const cancelDeleteBtn = document.getElementById("cancel-delete-btn");

// === DOM ELEMENT REFERENCES ===
// Main task modal
const modalBackdrop = document.getElementById("modal-backdrop");
const taskForm = document.getElementById("task-form");
const titleInput = document.getElementById("modal-task-title");
const titleFieldGroup = titleInput.closest(".form-group");
const deleteButton = document.getElementById("delete-task-btn");

/**
 * Processes the form submission event for creating or editing a task.
 * Validates input, determines if this is a create or update action, then persists the data.
 * @param {Event} event - Form submission event object.
 */
function handleFormSubmit(event) {
  event.preventDefault();
  const title = titleInput.value.trim();

  if (!title) {
    toggleTitleValidation(true);
    return;
  }

  const taskData = {
    title,
    description: document.getElementById("modal-task-description").value.trim(),
    status: document.getElementById("modal-task-status").value,
  };

  if (currentTaskId) {
    updateTask(currentTaskId, taskData);
  } else {
    addNewTask(taskData);
  }

  closeModal();
}

/**
 * Displays the delete confirmation modal when the "Delete Task" button is clicked.
 * Only triggers if a task is currently selected.
 */
function handleDeleteClick() {
  if (!currentTaskId) return;
  deleteModalBackdrop.classList.remove("hidden");
}
/**
 * Toggles visual validation feedback for the title field.
 * Adds/removes a CSS class to indicate an empty required field.
 * @param {boolean} show - Whether to display the validation message.
 */
function toggleTitleValidation(show) {
  titleFieldGroup.classList.toggle("show-validation", show);
}

/**
 * Prepares and fills the modal with either existing task data (edit mode) or default values (create mode).
 * Also adjusts modal headings, button labels, and visibility of delete controls.
 * @param {object|null} task - Task object to populate fields with, or null for a new task.
 */
function populateModal(task) {
  currentTaskId = task ? task.id : null;
  taskForm.reset();
  toggleTitleValidation(false);

  const modalTitle = document.getElementById("modal-title");
  const descriptionInput = document.getElementById("modal-task-description");
  const statusInput = document.getElementById("modal-task-status");
  const saveButton = document.getElementById("save-task-btn");

  if (task) {
    modalTitle.textContent = "Edit Task";
    titleInput.value = task.title;
    descriptionInput.value = task.description;
    statusInput.value = task.status;
    saveButton.textContent = "Save Changes";
    deleteButton.classList.remove("hidden");
  } else {
    modalTitle.textContent = "Add New Task";
    saveButton.textContent = "Create Task";
    deleteButton.classList.add("hidden");
    statusInput.value = "todo";
  }
}

/**
 * Opens the main task modal for either creating a new task or editing an existing one.
 * @param {object|null} task - The task to edit, or null to start with a blank form.
 */
export function openModal(task = null) {
  populateModal(task);
  modalBackdrop.classList.remove("hidden");
}

/**
 * Closes the main task modal without saving changes.
 */
export function closeModal() {
  modalBackdrop.classList.add("hidden");
}

export function setupModalEventListeners() {
  taskForm.addEventListener("submit", handleFormSubmit);

  // Delete button (in main modal)
  deleteButton.addEventListener("click", handleDeleteClick);

  // Live validation feedback
  titleInput.addEventListener("input", () => {
    if (titleInput.value.trim()) {
      toggleTitleValidation(false);
    }
  });

  // Close main modal
  document
    .getElementById("close-modal-btn")
    .addEventListener("click", closeModal);
  modalBackdrop.addEventListener("click", (event) => {
    if (event.target === modalBackdrop) {
      closeModal();
    }
  });

  // Confirm deletion
  confirmDeleteBtn.addEventListener("click", () => {
    if (currentTaskId) {
      deleteTask(currentTaskId);
      deleteModalBackdrop.classList.add("hidden");
      closeModal();
    }
  });

  // Cancel deletion
  cancelDeleteBtn.addEventListener("click", () => {
    deleteModalBackdrop.classList.add("hidden");
  });

  // Close delete modal by clicking backdrop
  deleteModalBackdrop.addEventListener("click", (event) => {
    if (event.target === deleteModalBackdrop) {
      deleteModalBackdrop.classList.add("hidden");
    }
  });
}
