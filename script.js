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
