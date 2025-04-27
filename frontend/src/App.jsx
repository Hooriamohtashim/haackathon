// 
import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Login from "./pages/Login";
import Signup from "./pages/Signup";

const App = () => {
  // State to manage tasks
  const [tasks, setTasks] = useState([]);
  const [taskTitle, setTaskTitle] = useState("");
  const [taskDescription, setTaskDescription] = useState("");

  // Function to add a new task
  const addTask = () => {
    if (taskTitle.trim() === "" || taskDescription.trim() === "") return;

    const newTask = {
      id: tasks.length + 1,
      title: taskTitle,
      description: taskDescription,
      status: "To Do",
    };

    setTasks([...tasks, newTask]);
    setTaskTitle("");
    setTaskDescription("");
  };

  // Function to change task status
  const changeStatus = (id, newStatus) => {
    setTasks((prevTasks) =>
      prevTasks.map((task) =>
        task.id === id ? { ...task, status: newStatus } : task
      )
    );
  };

  // Function to delete a task
  const deleteTask = (id) => {
    setTasks((prevTasks) => prevTasks.filter((task) => task.id !== id));
  };

  return (
    <Router>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/dashboard" element={
          <div style={styles.appContainer}>
            <h1 style={styles.header}>Task Tracker</h1>

            {/* Task Creation Section */}
            <div style={styles.addTaskContainer}>
              <input
                type="text"
                value={taskTitle}
                onChange={(e) => setTaskTitle(e.target.value)}
                placeholder="Enter Task Title"
                style={styles.input}
              />
              <textarea
                value={taskDescription}
                onChange={(e) => setTaskDescription(e.target.value)}
                placeholder="Enter Task Description"
                style={styles.textarea}
              />
              <button style={styles.submitButton} onClick={addTask}>
                Add Task
              </button>
            </div>

            {/* Task Columns */}
            <div style={styles.columnsContainer}>
              {/* To Do Column */}
              <div style={{ ...styles.column, backgroundColor: '#68a0b0' }}>
                <div style={{ ...styles.columnHeader, backgroundColor: '#4a7c88' }}>To Do</div>
                {tasks
                  .filter((task) => task.status === "To Do")
                  .map((task) => (
                    <div key={task.id} style={styles.taskCard}>
                      <h3>{task.title}</h3>
                      <p>{task.description}</p>
                      <button
                        style={styles.changeStatusButton}
                        onClick={() => changeStatus(task.id, "In Progress")}
                      >
                        Start
                      </button>
                      <button
                        style={styles.deleteButton}
                        onClick={() => deleteTask(task.id)}
                      >
                        Delete
                      </button>
                    </div>
                  ))}
              </div>

              {/* In Progress Column */}
              <div style={{ ...styles.column, backgroundColor: '#a5d8dd' }}>
                <div style={{ ...styles.columnHeader, backgroundColor: '#80c0d7' }}>In Progress</div>
                {tasks
                  .filter((task) => task.status === "In Progress")
                  .map((task) => (
                    <div key={task.id} style={styles.taskCard}>
                      <h3>{task.title}</h3>
                      <p>{task.description}</p>
                      <button
                        style={styles.changeStatusButton}
                        onClick={() => changeStatus(task.id, "Done")}
                      >
                        Complete
                      </button>
                      <button
                        style={styles.deleteButton}
                        onClick={() => deleteTask(task.id)}
                      >
                        Delete
                      </button>
                    </div>
                  ))}
              </div>

              {/* Done Column */}
              <div style={{ ...styles.column, backgroundColor: '#6abf8e' }}>
                <div style={{ ...styles.columnHeader, backgroundColor: '#58b57c' }}>Done</div>
                {tasks
                  .filter((task) => task.status === "Done")
                  .map((task) => (
                    <div key={task.id} style={styles.taskCard}>
                      <h3>{task.title}</h3>
                      <p>{task.description}</p>
                      <button
                        style={styles.deleteButton}
                        onClick={() => deleteTask(task.id)}
                      >
                        Delete
                      </button>
                    </div>
                  ))}
              </div>
            </div>
          </div>
        } />
      </Routes>
    </Router>
  );
};

// Login page component
const LoginPage = () => (
  <div style={styles.authContainer}>
    <h2 style={styles.authTitle}>Login</h2>
    <Login />
    <p>Don't have an account? <Link to="/signup" style={styles.link}>Sign Up</Link></p>
  </div>
);

// Signup page component
const SignupPage = () => (
  <div style={styles.authContainer}>
    <h2 style={styles.authTitle}>Sign Up</h2>
    <Signup />
    <p>Already have an account? <Link to="/" style={styles.link}>Login</Link></p>
  </div>
);

// Inline styles
const styles = {
  appContainer: {
    fontFamily: 'Arial, sans-serif',
    textAlign: 'center',
    padding: '20px',
    backgroundColor: '#f0f4f8',
    color: '#333333',
    minHeight: '100vh',
  },
  header: {
    color: '#444',
    fontSize: '2rem',
    marginBottom: '20px',
    fontWeight: '600',
  },
  addTaskContainer: {
    marginBottom: '30px',
  },
  input: {
    width: '300px',
    padding: '10px',
    fontSize: '1rem',
    borderRadius: '5px',
    border: '1px solid #ccc',
    outline: 'none',
    marginBottom: '10px',
  },
  textarea: {
    width: '300px',
    padding: '10px',
    fontSize: '1rem',
    borderRadius: '5px',
    border: '1px solid #ccc',
    outline: 'none',
    marginBottom: '10px',
    height: '100px',
  },
  submitButton: {
    padding: '10px 20px',
    backgroundColor: '#6abf8e',
    border: 'none',
    borderRadius: '5px',
    color: '#fff',
    fontSize: '1rem',
    cursor: 'pointer',
    transition: 'background-color 0.3s ease',
  },
  columnsContainer: {
    display: 'flex',
    justifyContent: 'space-around',
    gap: '20px',
    flexWrap: 'wrap',
  },
  column: {
    width: '30%',
    backgroundColor: '#fff',
    borderRadius: '10px',
    boxShadow: '0 4px 6px rgba(0,0,0,0.1)',
    padding: '10px',
    minHeight: '300px',
  },
  columnHeader: {
    padding: '10px',
    fontSize: '1.5rem',
    color: '#fff',
    borderRadius: '5px',
    marginBottom: '10px',
  },
  taskCard: {
    backgroundColor: '#fafafa',
    borderRadius: '5px',
    padding: '10px',
    marginBottom: '10px',
    boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
  },
  deleteButton: {
    backgroundColor: '#e74c3c',
    color: '#fff',
    padding: '5px 10px',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
    transition: 'background-color 0.3s ease',
    marginRight: '5px',
  },
  changeStatusButton: {
    backgroundColor: '#f39c12',
    color: '#fff',
    padding: '5px 10px',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
    transition: 'background-color 0.3s ease',
  },
  authContainer: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    height: '100vh',
    backgroundColor: '#eef2f7',
  },
  authTitle: {
    fontSize: '2rem',
    marginBottom: '20px',
    color: '#4a7c88',
  },
  link: {
    color: '#3498db',
    textDecoration: 'none',
    fontWeight: 'bold',
  },
};

export default App;
