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
