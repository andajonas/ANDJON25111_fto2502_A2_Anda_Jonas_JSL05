const initialTasks = [
  {
    id: 1,
    title: "Launch Epic Career 🚀",
    description: "Create a killer Resume",
    status: "todo",
  },
  {
    id: 2,
    title: "Master JavaScript 💛",
    description: "Get comfortable with the fundamentals",
    status: "doing",
  },
  {
    id: 3,
    title: "Keep on Going 🏆",
    description: "You're almost there",
    status: "doing",
  },

  {
    id: 4,
    title: "Learn Data Structures and Algorithms 📚",
    description:
      "Study fundamental data structures and algorithms to solve coding problems efficiently",
    status: "todo",
  },
  {
    id: 5,
    title: "Contribute to Open Source Projects 🌐",
    description:
      "Gain practical experience and collaborate with others in the software development community",
    status: "done",
  },
  {
    id: 6,
    title: "Build Portfolio Projects 🛠️",
    description:
      "Create a portfolio showcasing your skills and projects to potential employers",
    status: "done",
  },
];

const taskMap = {}; // Track tasks by ID
  
  // Render tasks into the board
  function renderTasks() {
    const statuses = ['todo', 'doing', 'done'];
  
    statuses.forEach((status) => {
      const container = document.querySelector(`.column-div[data-status="${status}"] .tasks-container`);
      container.innerHTML = ''; // Clear existing
      const filtered = initialTasks.filter((task) => task.status === status);
      filtered.forEach((task) => {
        taskMap[task.id] = task;
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
  
  // Modal handling
  function openModal(taskId) {
    const modal = getOrCreateModal();
    modal.classList.remove('hidden');
  
    const titleInput = modal.querySelector('#modal-title');
    const descriptionInput = modal.querySelector('#modal-description');
    const statusSelect = modal.querySelector('#modal-status');
    const deleteBtn = modal.querySelector('.delete-btn');
    const header = modal.querySelector('#modal-mode-title');
  
    if (taskId) {
      const task = taskMap[taskId];
      if (!task) return;
  
      titleInput.value = task.title;
      descriptionInput.value = task.description;
      statusSelect.value = task.status;
      modal.dataset.taskId = taskId;
      deleteBtn.style.display = 'inline-block';
      header.textContent = 'Edit Task';
    } else {
      titleInput.value = '';
      descriptionInput.value = '';
      statusSelect.value = 'todo';
      delete modal.dataset.taskId;
      deleteBtn.style.display = 'none';
      header.textContent = 'Add New Task';
    }
  }
  
  
  function closeModal() {
    const modal = document.querySelector('.modal');
    modal?.classList.add('hidden');
  }
  
  function saveChanges() {
    const modal = document.querySelector('.modal');
    const taskId = modal.dataset.taskId;
    const isEdit = !!taskId;
  
    const title = modal.querySelector('#modal-title').value.trim();
    const description = modal.querySelector('#modal-description').value.trim();
    const status = modal.querySelector('#modal-status').value;
  
    if (!title) {
      alert("Title is required.");
      return;
    }
  
    if (isEdit) {
      const task = taskMap[taskId];
      task.title = title;
      task.description = description;
      task.status = status;
    } else {
      const newTask = {
        id: Date.now(),
        title,
        description,
        status
      };
      initialTasks.push(newTask);
    }
  
    renderTasks();
    closeModal();
  }
  
  function deleteTask() {
    const modal = document.querySelector('.modal');
    const taskId = parseInt(modal.dataset.taskId);
  
    const index = initialTasks.findIndex((t) => t.id === taskId);
    if (index !== -1) {
      initialTasks.splice(index, 1);
    }
  
    renderTasks();
    closeModal();
  }
  
  function getOrCreateModal() {
    let modal = document.querySelector('.modal');
    if (modal) return modal;
  
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
  
    // Button events
    modal.querySelector('.close-btn').addEventListener('click', closeModal);
    modal.querySelector('.save-btn').addEventListener('click', () => {
      const taskId = modal.dataset.taskId;
      if (taskId) {
        saveChanges();
      } else {
        addNewTask();
      }
    });
    modal.querySelector('.delete-btn').addEventListener('click', deleteTask);
  
    return modal;
  }
  
  
  
  // Initialize board on load
  window.addEventListener('DOMContentLoaded', () => {
    renderTasks();
  
    // Add Task button event listener
  document.getElementById('add-task-btn').addEventListener('click', () => {
    openModal(); // Open modal in add mode
  });
});
  

  


