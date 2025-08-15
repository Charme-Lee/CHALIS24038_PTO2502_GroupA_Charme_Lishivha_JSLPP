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
