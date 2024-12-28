const addTaskButton = document.getElementById('addTaskButton');
const taskList = document.getElementById('taskList');
const catGif = document.getElementById('catGif');
const catSound = document.getElementById('catSound');

function loadTasks() {
    const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    tasks.forEach(task => {
        addTaskToDOM(task.name, task.completed);
    });
}

function addTaskToDOM(taskName, completed = false) {
    const taskItem = document.createElement('li');

    const checkbox = document.createElement('input');
    checkbox.type = 'checkbox';
    checkbox.checked = completed;

    if (completed) {
        taskItem.style.textDecoration = 'line-through';
    }

    checkbox.addEventListener('click', function() {
        if (checkbox.checked) {
            taskItem.style.textDecoration = 'line-through';
        } else {
            taskItem.style.textDecoration = 'none';
        }
        saveTasks();
    });

    const taskText = document.createTextNode(taskName);

    const deleteButton = document.createElement('button');
    deleteButton.textContent = 'Delete';
    
    deleteButton.addEventListener('click', function() {
        taskList.removeChild(taskItem);
        saveTasks();
    });

    taskItem.appendChild(checkbox);
    taskItem.appendChild(taskText);
    taskItem.appendChild(deleteButton);

    taskList.appendChild(taskItem);
}

function saveTasks() {
    const tasks = [];
    const taskItems = taskList.getElementsByTagName('li');
    for (let item of taskItems) {
        const checkbox = item.querySelector('input[type="checkbox"]');
        tasks.push({
            name: item.textContent.replace('Delete', '').trim(),
            completed: checkbox.checked
        });
    }
    localStorage.setItem('tasks', JSON.stringify(tasks));
}


loadTasks();

addTaskButton.addEventListener('click', function() {
    const taskName = prompt("Enter a task:");

    if (taskName && taskName.trim() !== '') {
        addTaskToDOM(taskName);
        saveTasks();
    }
});

function playSound() {
    catSound.play().catch(error => {
        console.error("Error playing sound:", error);
    });
}

catGif.addEventListener('click', playSound);
    catGif.addEventListener('touchstart', function(event) {
        event.preventDefault(); // Prevent default touch behavior
        playSound();
    });

