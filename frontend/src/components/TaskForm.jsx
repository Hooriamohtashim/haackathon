import axios from 'axios';

const TaskList = ({ tasks, fetchTasks }) => {
  const handleStatusChange = async (id, newStatus) => {
    try {
      await axios.patch(`http://localhost:5000/api/tasks/update/${id}`, { status: newStatus });
      fetchTasks();
    } catch (err) {
      console.error(err);
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/tasks/${id}`);
      fetchTasks();
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div>
      {tasks.length === 0 ? (
        <p>No tasks yet!</p>
      ) : (
        <ul>
          {tasks.map((task) => (
            <li key={task._id} style={{ marginBottom: '10px' }}>
              <strong>{task.title}</strong> - {task.description} [{task.status}]
              <br />
              <select
                value={task.status}
                onChange={(e) => handleStatusChange(task._id, e.target.value)}
                style={{ marginRight: '10px', marginTop: '5px' }}
              >
                <option value="To Do">To Do</option>
                <option value="In Progress">In Progress</option>
                <option value="Done">Done</option>
              </select>
              <button onClick={() => handleDelete(task._id)} style={{ padding: '5px 10px' }}>
                Delete
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default TaskList;
