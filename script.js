document.addEventListener('DOMContentLoaded', () => {
    const newTaskInput = document.getElementById('new-task');
    const addTaskBtn = document.getElementById('add-task-btn');
    const tasksList = document.getElementById('tasks');

    addTaskBtn.addEventListener('click', () => {
        const taskText = newTaskInput.value.trim();
        if (taskText) {
            addTask(taskText);
            newTaskInput.value = '';
        }
    });

    tasksList.addEventListener('click', (e) => {
        if (e.target.classList.contains('delete-task-btn')) {
            const taskItem = e.target.closest('li');
            deleteTask(taskItem.dataset.id);
        } else if (e.target.classList.contains('task-checkbox')) {
            const taskItem = e.target.closest('li');
            toggleTaskCompletion(taskItem.dataset.id, e.target.checked);
        }
    });

    function addTask(text) {
        fetch('/tasks', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ text })
        }).then(() => {
            location.reload();
        });
    }

    function deleteTask(id) {
        fetch(`/tasks/${id}`, {
            method: 'DELETE'
        }).then(() => {
            location.reload();
        });
    }

    function toggleTaskCompletion(id, completed) {
        fetch(`/tasks/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ completed })
        }).then(() => {
            location.reload();
        });
    }
});
