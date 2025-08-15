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

/**
 * Determines and applies the initial theme when the app loads.
 * Priority: user-saved preference in localStorage → system's preferred color scheme → light mode.
 */
function loadInitialTheme() {
  const savedTheme = localStorage.getItem("theme");
  const systemPreference = window.matchMedia(
    "(prefers-color-scheme: dark)"
  ).matches;
  applyTheme(savedTheme || (systemPreference ? "dark" : "light"));
}

/**
 * Applies a visual theme (light or dark) across the application.
 * Updates the DOM, persists the choice to localStorage, and syncs the theme state between desktop and mobile toggles.
 * Also updates the logo to match the active theme.
 * @param {'Dark' | 'Light'} theme - The theme to apply.
 */
function applyTheme(theme) {
  document.body.setAttribute("data-theme", theme);
  localStorage.setItem("theme", theme);
  const isDark = theme === "dark";
  themeToggle.checked = isDark;
  mobileThemeToggle.checked = isDark;

  //-----------------------------------------------------------------
  // Update logo based on theme
  if (mainLogo) {
    mainLogo.src = isDark
      ? "./assets/logo-dark.svg"
      : "./assets/logo-light.svg";
  }
}

/**
 * Toggles the sidebar’s visibility in desktop view.
 * Also adjusts the main content layout accordingly.
 */
function toggleSidebar() {
  sidebar.classList.toggle("hidden");
  mainContent.classList.toggle("sidebar-hidden");
}

/**
 * Toggles the mobile menu visibility for smaller screens.
 */
function toggleMobileMenu() {
  mobileMenuModal.classList.toggle("hidden");
}

/**
 * Registers all application-wide event listeners:
 * - Sidebar show/hide buttons
 * - Theme toggles (desktop & mobile)
 * - Mobile menu open/close behavior
 * - Task creation buttons
 * - Closing the mobile menu when clicking outside of it
 */
function setupGlobalEventListeners() {
  // Sidebar controls
  document
    .getElementById("hide-sidebar-btn")
    .addEventListener("click", toggleSidebar);
  showSidebarBtn.addEventListener("click", toggleSidebar);

  // Theme controls
  themeToggle.addEventListener("change", () =>
    applyTheme(themeToggle.checked ? "dark" : "light")
  );
  mobileThemeToggle.addEventListener("change", () =>
    applyTheme(mobileThemeToggle.checked ? "dark" : "light")
  );

  document
    .getElementById("close-mobile-menu-btn")
    .addEventListener("click", toggleMobileMenu);

  // Task creation buttons
  document
    .getElementById("add-new-task-btn")
    .addEventListener("click", () => openModal());
  document
    .getElementById("add-new-task-from-empty-btn")
    .addEventListener("click", () => openModal());

  // Mobile menu controls
  mobileMenuTrigger.addEventListener("click", (event) => {
    event.stopPropagation(); // Prevent immediate close from document listener
    toggleMobileMenu();
  });

  // Close mobile menu when clicking outside
  document.addEventListener("click", (event) => {
    if (
      !mobileMenuModal.classList.contains("hidden") &&
      !mobileMenuModal.contains(event.target) &&
      !mobileMenuTrigger.contains(event.target)
    ) {
      toggleMobileMenu();
    }
  });
}

/**
 * Initializes the Kanban application:
 * - Sets up event listeners
 * - Configures modal behavior
 * - Loads and applies theme
 * - Fetches and displays initial task data
 */
async function init() {
  setupGlobalEventListeners();
  await initializeTasks();
  setupModalEventListeners();
  loadInitialTheme();
}

// Launch the application once the DOM is fully loaded
document.addEventListener("DOMContentLoaded", init);
