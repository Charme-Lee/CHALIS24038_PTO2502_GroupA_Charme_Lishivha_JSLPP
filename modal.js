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
    // priority: document.getElementById("modal-task-priority").value,
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
