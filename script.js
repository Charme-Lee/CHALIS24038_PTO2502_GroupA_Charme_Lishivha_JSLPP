/**
 *script.js
 *Main bootstrap file for the Kanban application.
 * Handles app initialization, theme management, sidebar/menu toggling, and registration of global event listeners.
 * Serves as the primary entry point that wires together UI interactions and core modules.
 */

import { initializeTasks } from "./tasks.js";
import { openModal, setupModalEventListeners } from "./modal.js";

// === DOM ELEMENT REFERENCES ===

// Branding
const mainLogo = document.querySelector(".main-logo");

// Theme controls
const themeToggle = document.getElementById("theme-toggle");
const mobileThemeToggle = document.getElementById("mobile-theme-toggle");

// Sidebar and content layout
const sidebar = document.getElementById("sidebar");
const mainContent = document.getElementById("main-content");
const showSidebarBtn = document.getElementById("show-sidebar-btn");

// Mobile menu controls
const mobileMenuModal = document.getElementById("mobile-menu-modal");
const mobileMenuTrigger = document.getElementById("mobile-menu-trigger");
