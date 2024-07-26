const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const port = 3000;

let tasks = [];

app.use(bodyParser.json());
app.use(express.static('public'));
app.set('view engine', 'ejs');

app.get('/', (req, res) => {
    res.render('index', { tasks });
});

app.post('/tasks', (req, res) => {
    const newTask = { text: req.body.text, completed: false };
    tasks.push(newTask);
    res.sendStatus(201);
});

app.put('/tasks/:id', (req, res) => {
    const taskId = req.params.id;
    tasks[taskId].completed = req.body.completed;
    res.sendStatus(200);
});

app.delete('/tasks/:id', (req, res) => {
    const taskId = req.params.id;
    tasks.splice(taskId, 1);
    res.sendStatus(200);
});

app.listen(port, () => {
    console.log(`To-Do List app listening at http://localhost:${port}`);
});
