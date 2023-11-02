const express = require('express');
const cors = require('cors');
const fs = require('fs');

const app = express();
app.use(cors({ origin: 'http://localhost:5173' }));
const PORT = 3009;

app.use(express.json());

let tasks = [];

try {
  const rawData = fs.readFileSync('tasks.json', { encoding: 'utf8' });
  tasks = JSON.parse(rawData);
} catch (error) {
  console.error('Error reading tasks.json file:', error);
}

const fixAndBackupData = () => {
  try {
    const backupData = JSON.stringify(tasks, null, 2);
    fs.writeFileSync('tasks_backup.json', backupData, { encoding: 'utf8' });
    console.log('Current data has been backed up.');

    const fixedData = JSON.stringify(tasks, null, 2);
    fs.writeFileSync('tasks.json', fixedData, { encoding: 'utf8' });
    console.log('tasks.json file has been successfully fixed.');
  } catch (error) {
    console.error('An error occurred while fixing tasks.json file:', error);
  }
};

fixAndBackupData();

app.get('/tasks', (req, res) => {
  res.json(tasks);
});

app.post('/tasks', (req, res) => {
  try {
    const newTask = req.body;
    const nextId = tasks.length > 0 ? Math.max(...tasks.map(task => parseInt(task._id))) + 1 : 1;
    newTask._id = nextId.toString();

    tasks.push(newTask);
    fixAndBackupData();

    res.status(201).json(newTask);
  } catch (error) {
    console.error('Error while creating task:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});

app.put('/tasks/:taskId', (req, res) => {
  const taskId = req.params.taskId;
  const updatedTask = req.body;
  const taskIndex = tasks.findIndex(task => task._id === taskId);

  if (taskIndex !== -1) {
    tasks[taskIndex] = { ...tasks[taskIndex], ...updatedTask };
    fixAndBackupData();
    res.json({ message: `Task with ID ${taskId} has been updated.` });
  } else {
    res.status(404).json({ message: `Task with ID ${taskId} not found.` });
  }
});

app.delete('/tasks/:taskId', (req, res) => {
  const taskId = req.params.taskId;
  console.log("Data Type of tasks:", typeof tasks);
  const taskIndex = tasks.findIndex(task => task._id === taskId);

  if (taskIndex !== -1) {
    tasks.splice(taskIndex, 1);
    fixAndBackupData();
    res.json({ message: `Task with ID ${taskId} has been deleted.` });
  } else {
    res.status(404).json({ message: `Task with ID ${taskId} not found.` });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
