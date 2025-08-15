/**
 * tasks.js
 * Manages the lifecycle of Kanban tasks: state handling, API fetching,
 *              rendering tasks to the board, and performing CRUD operations.
 */

import { saveTasksToStorage, loadTasksFromStorage } from "./storage.js";
import { openModal } from "./modal.js";
let state = [];

// DOM references for board states and containers
// Local application state holding all tasks
const kanbanBoardElement = document.getElementById("kanban-board");
const columnDivs = document.querySelectorAll(".column-div");

// API base URL for task fetching
const API_URL = "https://jsl-kanban-api.vercel.app/";

/**
 * Updates the numeric task counts displayed in each Kanban column header.
 */
function updateTaskCountDisplays() {
  const counts = state.reduce(
    (acc, task) => {
      acc[task.status] = (acc[task.status] || 0) + 1;
      return acc;
    },
    { todo: 0, doing: 0, done: 0 }
  );

  for (const status in counts) {
    const countElement = document.querySelector(
      `.column-div[data-status="${status}"] .column-count`
    );
    if (countElement) {
      countElement.textContent = `(${counts[status]})`;
    }
  }
}

/**
 * Fetches tasks from the API.
 * @returns {Promise<Array>} Resolves with an array of task objects, or an empty array on failure.
 */
async function fetchTasksFromAPI() {
  try {
    const response = await fetch(API_URL);
    if (!response.ok) throw new Error(`API Error: ${response.status}`);
    return await response.json();
  } catch (error) {
    console.error("Failed to fetch tasks from API:", error);
    return [];
  }
}

/**
 * Creates a DOM element representing a single task card.
 * @param {object} task - The task object containing title, priority, and ID.
 * @returns {HTMLElement} The generated task card element.
 */
function createTaskElement(task) {
  const taskCard = document.createElement("div");
  taskCard.className = "task-card";
  taskCard.dataset.taskId = task.id;
  taskCard.innerHTML = `
    <div class="task-header-container">
      <h3 class="task-title">${task.title}</h3>
      </div>
    
  `;
  taskCard.addEventListener("click", () => openModal(task));
  return taskCard;
}

/**
 * Renders all tasks in the state to their corresponding columns.
 */
export function renderTasks() {
  const tasksByStatus = { todo: [], doing: [], done: [] };
  state.forEach((task) => {
    if (tasksByStatus[task.status]) {
      tasksByStatus[task.status].push(task);
    }
  });

  columnDivs.forEach((column) => {
    const status = column.dataset.status;
    const container = column.querySelector(".tasks-container");
    if (container) {
      container.innerHTML = "";
      tasksByStatus[status].forEach((task) =>
        container.appendChild(createTaskElement(task))
      );
    }
  });

  updateTaskCountDisplays();
}

/**
 * Adds a new task to the state, saves it, and re-renders.
 * @param {object} taskData - The data for the new task (title, description, status, priority).
 */
export function addNewTask(taskData) {
  const newId = `task-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
  const newTask = { ...taskData, id: newId };
  state.push(newTask);
  saveTasksToStorage(state);
  renderTasks();
}

/**
 * Updates an existing task and re-renders.
 * @param {string} id - Task ID to update.
 * @param {object} updates - Partial task data to merge into the existing task.
 */
export function updateTask(id, updates) {
  const taskIndex = state.findIndex((task) => task.id === id);
  if (taskIndex > -1) {
    state[taskIndex] = { ...state[taskIndex], ...updates };
    saveTasksToStorage(state);
    renderTasks();
  }
}

/**
 * Removes a task by ID from the state and re-renders.
 * @param {string} id - Task ID to delete.
 */
export function deleteTask(id) {
  state = state.filter((task) => task.id !== id);
  saveTasksToStorage(state);
  renderTasks();
}
/**
 * Loads tasks from local storage or fetches them from the API if none exist.
 * Sets up the board accordingly.
 */
export async function initializeTasks() {
  let tasks = loadTasksFromStorage();

  if (tasks.length === 0) {
    tasks = await fetchTasksFromAPI();
    console.log("API Response:", tasks);
  } else {
    state = tasks.map((task) => ({
      ...task,
    }));
    saveTasksToStorage(state);
    renderTasks();
  }
}
