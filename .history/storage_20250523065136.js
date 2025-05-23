/**
 * @file storage.js
 * @description Provides localStorage save/load functions for tasks.
 */

import { initialTasks } from './initialData.js';

/**
 * Saves the current tasks array to localStorage.
 */
export function saveToLocalStorage() {
  localStorage.setItem('tasks', JSON.stringify(initialTasks));
}

/**
 * Loads tasks from localStorage into the initialTasks array.
 * If no stored data, does nothing.
 */
export function loadFromLocalStorage() {
  const stored = localStorage.getItem('tasks');
  if (stored) {
    const parsed = JSON.parse(stored);
    initialTasks.length = 0; // Clear existing
    parsed.forEach(task => initialTasks.push(task));
  }
}
