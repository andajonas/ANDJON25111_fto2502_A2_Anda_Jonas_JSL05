/**
 * @file script.js
 * @description Main entry point, initializes the board and event listeners.
 */

import { loadFromLocalStorage } from './storage.js';
import { renderTasks, openModal } from './ui.js';

window.addEventListener('DOMContentLoaded', () => {
  loadFromLocalStorage();
  renderTasks();

  const addBtn = document.getElementById('add-task-btn');
  if (addBtn) {
    addBtn.addEventListener('click', () => openModal());
  }
});
