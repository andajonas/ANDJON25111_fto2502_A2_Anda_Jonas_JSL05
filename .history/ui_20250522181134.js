/**
 * @file ui.js
 * @description UI rendering and modal management.
 */

import { initialTasks } from './initialData.js';
import { taskMap, refreshTaskMap, addTask, editTask, deleteTask } from './tasks.js';
import { saveToLocalStorage } from './storage.js';

/**
 * Render all tasks in their respective columns.
 */
export function renderTasks() {
  refreshTaskMap();

  const statuses = ['todo', 'doing', 'done'];

  statuses.forEach((status) => {
    const container = document.querySelector(`.column-div[data-status="${status}"] .tasks-container`);
    container.innerHTML = ''; // Clear existing
    const filtered = initialTasks.filter(task => task.status === status);
    filtered.forEach(task => {
      const div = document.createElement('div');
      div.className = 'task-div';
      div.textContent = task.title;
      div.dataset.taskId = task.id;
      div.addEventListener('click', () => openModal(task.id));
      container.appendChild(div);
    });

    // Update column header count
    const header = document.querySelector(`#${status}Text`);
    if (header) header.textContent = `${status.toUpperCase()} (${filtered.length})`;
  });
}

/**
 * Get or create the modal element and attach event listeners.
 * @returns {HTMLElement} The modal element.
 */
export function getOrCreateModal() {
    let modal = document.querySelector('.modal');
  
    if (!modal) {
      modal = document.createElement('div');
      modal.className = 'modal hidden';
      modal.innerHTML = `
        <div class="modal-content">
          <div class="modal-header">
            <h2 id="modal-mode-title">Task</h2>
            <span class="close-btn">&times;</span>
          </div>
  
          <label for="modal-title"><strong>Title</strong></label>
          <input type="text" id="modal-title" />
  
          <label for="modal-description"><strong>Description</strong></label>
          <textarea id="modal-description" rows="4"></textarea>
  
          <label for="modal-status"><strong>Current Status</strong></label>
          <select id="modal-status">
            <option value="todo">To Do</option>
            <option value="doing">Doing</option>
            <option value="done">Done</option>
          </select>
  
          <div class="modal-buttons">
            <button class="save-btn">Save Changes</button>
            <button class="delete-btn">Delete Task</button>
          </div>
        </div>
      `;
      document.body.appendChild(modal);
    }
  
    const closeBtn = modal.querySelector('.close-btn');
    const saveBtn = modal.querySelector('.save-btn');
    const deleteBtn = modal.querySelector('.delete-btn');
  
    closeBtn.onclick = closeModal;
  
    saveBtn.onclick = () => {
      const taskId = modal.dataset.taskId;
      if (taskId) {
        saveChanges();
      } else {
        addNewTask();
      }
    };
  
    // Set button text based on modal mode
    if (modal.dataset.taskId) {
      saveBtn.textContent = 'Save Changes';
      deleteBtn.style.display = 'inline-block';
    } else {
      saveBtn.textContent = 'Create Task';
      deleteBtn.style.display = 'none';
    }
  
    return modal;
  }
  

/**
 * Open the modal for a specific task or for adding new task.
 * @param {number | undefined} taskId
 */
export 
}

/**
 * Close the modal.
 */
export function closeModal() {
  const modal = document.querySelector('.modal');
  modal?.classList.add('hidden');
}

/**
 * Save changes made in modal for existing task.
 */
function saveChanges() {
  const modal = document.querySelector('.modal');
  const taskId = Number(modal.dataset.taskId);
  const title = modal.querySelector('#modal-title').value.trim();
  const description = modal.querySelector('#modal-description').value.trim();
  const status = modal.querySelector('#modal-status').value;

  if (!title) {
    alert("Title is required.");
    return;
  }

  const updated = editTask(taskId, { title, description, status });
  if (updated) {
    saveToLocalStorage();
    renderTasks();
    closeModal();
  }
}

/**
 * Add a new task from modal input values.
 */
function addNewTask() {
  const modal = document.querySelector('.modal');
  const title = modal.querySelector('#modal-title').value.trim();
  const description = modal.querySelector('#modal-description').value.trim();
  const status = modal.querySelector('#modal-status').value;

  if (!title) {
    alert("Please enter a title.");
    return;
  }

  addTask({ title, description, status });
  saveToLocalStorage();
  renderTasks();
  closeModal();
}

/**
 * Delete task from modal.
 */
function deleteTaskHandler() {
  const modal = document.querySelector('.modal');
  const taskId = Number(modal.dataset.taskId);
  if (!taskId) return;

  const deleted = deleteTask(taskId);
  if (deleted) {
    saveToLocalStorage();
    renderTasks();
    closeModal();
  }
}
