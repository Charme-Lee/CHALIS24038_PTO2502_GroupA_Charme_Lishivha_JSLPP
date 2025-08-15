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
