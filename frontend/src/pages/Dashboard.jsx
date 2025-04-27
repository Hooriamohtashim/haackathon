import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Dashboard = () => {
  const [tasks, setTasks] = useState([]);
  const [newTaskTitle, setNewTaskTitle] = useState('');
  const [newTaskDescription, setNewTaskDescription] = useState('');

  // Fetch tasks from the backend
  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/tasks');
        setTasks(response.data);
      } catch (error) {
        console.error('Error fetching tasks:', error);
      }
    };
    fetchTasks();
  }, []);

  // Add a new task
  const addTask = async () => {
    if (!newTaskTitle || !newTaskDescription) return;

    try {
      const newTask = {
        title: newTaskTitle,
        description: newTaskDescription,
        status: 'To Do',
      };
      const response = await axios.post('http://localhost:5000/api/tasks/add', newTask);
      setTasks([...tasks, response.data]);
      setNewTaskTitle('');
      setNewTaskDescription('');
    } catch (error) {
      console.error('Error adding task:', error);
    }
  };

  // Update task status
  const updateTaskStatus = async (id, status) => {
    try {
      const response = await axios.patch(`http://localhost:5000/api/tasks/update/${id}`, { status });
      const updatedTask = response.data;
      setTasks((prevTasks) =>
        prevTasks.map((task) => (task._id === id ? updatedTask : task))
      );
    } catch (error) {
      console.error('Error updating task status:', error);
    }
  };

  // Delete a task
  const deleteTask = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/tasks/${id}`);
      setTasks((prevTasks) => prevTasks.filter((task) => task._id !== id));
    } catch (error) {
      console.error('Error deleting task:', error);
    }
  };

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-2xl font-bold mb-4">Task Tracker</h1>
      {/* Task Creation */}
      <div className="mb-6 flex flex-row items-center space-y-4">
  <div className=""><input
    type="text"
    placeholder="Task Title"
    className="p-4 m-2 border border-gray-300 rounded mb-2 w-full"
    value={newTaskTitle}
    onChange={(e) => setNewTaskTitle(e.target.value)}
  /></div>
  
  <div><textarea
    placeholder="Task Description"
    className="p-4 m-2 border border-gray-300 rounded mb-2 w-full"
    value={newTaskDescription}
    onChange={(e) => setNewTaskDescription(e.target.value)}
  />
  </div>
  <div>
  <button
    className="bg-blue-500 text-white py-2 px-4 rounded mt-4 w-full"
    onClick={addTask}
  >
    Add Task
  </button>
  </div>
</div>


      {/* Task Columns */}
      <div className="flex space-x-4">
        {/* To Do Column */}
        <div className="w-1/3 p-4 border border-gray-300 rounded">
          <h2 className="font-semibold mb-2 text-lg">To Do</h2>
          {tasks.filter((task) => task.status === 'To Do').map((task) => (
            <div key={task._id} className="bg-gray-100 p-4 mb-4 rounded shadow-md">
              <h3 className="font-semibold">{task.title}</h3>
              <p>{task.description}</p>
              <button
                className="bg-yellow-500 text-white py-1 px-3 rounded mt-2 mr-2"
                onClick={() => updateTaskStatus(task._id, 'In Progress')}
              >
                Start
              </button>
              <button
                className="bg-red-500 text-white py-1 px-3 rounded mt-2"
                onClick={() => deleteTask(task._id)}
              >
                Delete
              </button>
            </div>
          ))}
        </div>

        {/* In Progress Column */}
        <div className="w-1/3 p-4 border border-gray-300 rounded">
          <h2 className="font-semibold mb-2 text-lg">In Progress</h2>
          {tasks.filter((task) => task.status === 'In Progress').map((task) => (
            <div key={task._id} className="bg-gray-100 p-4 mb-4 rounded shadow-md">
              <h3 className="font-semibold">{task.title}</h3>
              <p>{task.description}</p>
              <button
                className="bg-green-500 text-white py-1 px-3 rounded mt-2 mr-2"
                onClick={() => updateTaskStatus(task._id, 'Done')}
              >
                Complete
              </button>
              <button
                className="bg-red-500 text-white py-1 px-3 rounded mt-2"
                onClick={() => deleteTask(task._id)}
              >
                Delete
              </button>
            </div>
          ))}
        </div>

        {/* Done Column */}
        <div className="w-1/3 p-4 border border-gray-300 rounded">
          <h2 className="font-semibold mb-2 text-lg">Done</h2>
          {tasks.filter((task) => task.status === 'Done').map((task) => (
            <div key={task._id} className="bg-gray-100 p-4 mb-4 rounded shadow-md">
              <h3 className="font-semibold">{task.title}</h3>
              <p>{task.description}</p>
              <button
                className="bg-red-500 text-white py-1 px-3 rounded mt-2"
                onClick={() => deleteTask(task._id)}
              >
                Delete
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
