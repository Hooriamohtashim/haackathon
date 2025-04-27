const express = require('express');
const router = express.Router();
const Task = require('./models/task');

// Add a new task
router.post('/add', async (req, res) => {
  try {
    const { title, description, status } = req.body;
    const newTask = new Task({ title, description, status });
    await newTask.save();
    res.status(201).json(newTask);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Get all tasks
router.get('/', async (req, res) => {
  try {
    const tasks = await Task.find();
    res.status(200).json(tasks);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Update task
router.patch('/update/:id', async (req, res) => {
  try {
    const { status } = req.body;
    const updatedTask = await Task.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true }
    );
    res.status(200).json(updatedTask);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Delete task
router.delete('/:id', async (req, res) => {
  try {
    await Task.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: 'Task deleted successfully' });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

module.exports = router;
