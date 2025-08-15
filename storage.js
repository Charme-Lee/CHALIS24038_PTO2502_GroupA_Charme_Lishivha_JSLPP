/**
 * storage.js
 * Utility module for managing task persistence in the browser's localStorage.
 * Provides functions to save, load, and clear tasks so that data remains available between sessions.
 * All tasks are stored under a single key to simplify retrieval and updates.
 */

const LOCAL_STORAGE_KEY = "kanban-tasks"; // Unique key used to store tasks in localStorage
const initialData = [
  {
    id: 1,
    title: "Launch Epic Career 🚀",
    description: "Ready for production",
    status: "todo",
    // priority: "high",
  },
  {
    id: 2,
    title: "Conquer React ⚛️",
    description: "Practice makes perfect",
    status: "todo",
    // priority: "medium",
  },
  {
    id: 3,
    title: "Understand Databases ⚙️",
    description: "Deep dive into JavaScript",
    status: "todo",
    // priority: "high",
  },
  {
    id: 4,
    title: "CrushFramework 🖼️",
    description: "Youtube is your best friend darling",
    status: "todo",
    // priority: "medium",
  },
  {
    id: 5,
    title: "Master JavaScript 💛",
    description: "Advance coding skills",
    status: "doing",
    // priority: "medium",
  },
  {
    id: 6,
    title: "Never Give Up 🙌",
    description: "You got this!",
    status: "doing",
    // priority: "low",
  },
  {
    id: 7,
    title: "Explore ES6 Features 🚀",
    description: "Girl, do some revision",
    status: "done",
    // priority: "low",
  },
  {
    id: 8,
    title: "Have fun 🥳",
    description: "Whooohooo, time for a luncheon!",
    status: "done",
    // priority: "medium",
  },
];

export function loadTasksFromStorage() {
  const data = localStorage.getItem(LOCAL_STORAGE_KEY);
  if (!data) {
    // initialData if no tasks exist
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(initialData));
    return initialData;
  }

  try {
    const tasks = JSON.parse(data);
    return Array.isArray(tasks) ? tasks : [];
  } catch (error) {
    console.error("Error parsing tasks from local storage:", error);
    localStorage.removeItem(LOCAL_STORAGE_KEY);
    return [];
  }
}
