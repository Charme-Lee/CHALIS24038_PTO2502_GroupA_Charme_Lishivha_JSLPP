/**
 *script.js
 *Main bootstrap file for the Kanban application.
 * Handles app initialization, theme management, sidebar/menu toggling, and registration of global event listeners.
 * Serves as the primary entry point that wires together UI interactions and core modules.
 */

import { initializeTasks } from "./tasks.js";
import { openModal, setupModalEventListeners } from "./modal.js";
