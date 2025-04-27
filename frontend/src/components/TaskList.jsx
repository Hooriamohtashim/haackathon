import React from 'react';
import PropTypes from 'prop-types';

function TaskList({ tasks }) {
  // Ensure tasks is defined and is an array before accessing 'length'
  const taskList = Array.isArray(tasks) ? tasks : [];

  if (taskList.length === 0) {
    return <p>No tasks found.</p>;
  }

  return (
    <div style={{ marginTop: '20px' }}>
      {taskList.map((task) => (
        <div
          key={task._id}
          style={{
            border: '1px solid #ccc',
            borderRadius: '8px',
            padding: '15px',
            marginBottom: '10px',
            backgroundColor: task.status === 'Done' ? '#e0ffe0' : '#fff',
          }}
        >
          <h3>{task.title}</h3>
          <p>{task.description}</p>
          <p><strong>Status:</strong> {task.status}</p>
        </div>
      ))}
    </div>
  );
}

// Prop validation
TaskList.propTypes = {
  tasks: PropTypes.array,
};

TaskList.defaultProps = {
  tasks: [], // default to empty array if no tasks are passed
};

export default TaskList;
