/**
 * @file tasks.js
 * @description Functions to manipulate tasks data.
 */

import { initialTasks } from './initialData.js';

/**
 * Map to quickly lookup tasks by ID.
 * @type {Object<number, Object>}
 */
export const taskMap = {};

/**
 * Refresh the taskMap from the initialTasks array.
 */
export function refreshTaskMap() {
  Object.keys(taskMap).forEach(key => delete taskMap[key]); // clear old keys
  initialTasks.forEach(task => {
    taskMap[task.id] = task;
  });
}

/**
 * Add a new task to the list and map.
 * @param {{title: string, description: string, status: string}} taskData
 * @returns {Object} The newly created task object.
 */
export function addTask(taskData) {
  const newTask = {
    id: Date.now(),
    title: taskData.title,
    description: taskData.description,
    status: taskData.status,
  };
  initialTasks.push(newTask);
  taskMap[newTask.id] = newTask;
  return newTask;
}

/**
 * Edit an existing task.
 * @param {number} taskId
 * @param {{title: string, description: string, status: string}} updates
 * @returns {boolean} True if task was found and updated.
 */
export function editTask(taskId, updates) {
  const task = taskMap[taskId];
  if (!task) return false;

  task.title = updates.title;
  task.description = updates.description;
  task.status = updates.status;
  return true;
}

/**
 * Delete a task by ID.
 * @param {number} taskId
 * @returns {boolean} True if a task was deleted.
 */
export function deleteTask(taskId) {
  const index = initialTasks.findIndex(task => task.id === taskId);
  if (index === -1) return false;

  initialTasks.splice(index, 1);
  delete taskMap[taskId];
  return true;
}
