
import React, { useState, useEffect } from 'react';
import TaskCard from './TaskList';
import axios from 'axios';

const TaskBoard = () => {
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:5000/api/tasks')
      .then(response => setTasks(response.data))
      .catch(error => console.error(error));
  }, []);

  return (
    <div className="container">
      <div className="column">
        <h2>To Do</h2>
        {tasks.filter(task => task.status === 'To Do').map(task => (
          <TaskCard key={task._id} task={task} />
        ))}
      </div>
      <div className="column">
        <h2>In Progress</h2>
        {tasks.filter(task => task.status === 'In Progress').map(task => (
          <TaskCard key={task._id} task={task} />
        ))}
      </div>
      <div className="column">
        <h2>Done</h2>
        {tasks.filter(task => task.status === 'Done').map(task => (
          <TaskCard key={task._id} task={task} />
        ))}
      </div>
    </div>
  );
};

export default TaskBoard;
