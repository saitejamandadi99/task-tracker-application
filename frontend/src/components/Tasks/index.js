// frontend/src/components/Tasks.js
import React, { useEffect, useState, useCallback } from 'react';
import axios from 'axios';
import TaskCard from '../TaskCard';
import { useParams, useNavigate } from 'react-router-dom';
import { FaPlus } from 'react-icons/fa';
import 'bootstrap/dist/css/bootstrap.min.css';
import './index.css';

const Tasks = () => {
  const { projectId } = useParams();
  const [tasks, setTasks] = useState([]);
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  const fetchTasks = useCallback(async () => {
    const token = localStorage.getItem('token');
    try {
      const res = await axios.get(`http://localhost:5000/api/tasks/project/${projectId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setTasks(res.data.tasks);
    } catch (error) {
      setMessage(error.response?.data?.message || 'Failed to fetch tasks');
    }
  }, [projectId]);

  useEffect(() => {
    fetchTasks();
  }, [fetchTasks]);

  const handleDeleteTask = async (taskId) => { // Changed function name to handleDeleteTask
    const token = localStorage.getItem('token');
    try {
      console.log(taskId)
      await axios.delete(`http://localhost:5000/api/tasks/${taskId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setTasks(tasks.filter(task => task._id !== taskId));
    } catch (error) {
      setMessage(error.response?.data?.message || 'Delete failed');
    }
  };

  const handleCreate = () => {
    navigate(`/create-task/${projectId}`);
  };

  return (
    <div className="container mt-4">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h3>Tasks</h3>
        <button className="btn btn-primary" onClick={handleCreate}>
          <FaPlus className="me-2" /> Add Task
        </button>
      </div>

      {message && <div className="alert alert-danger">{message}</div>}

      <div className="row">
        {tasks.map(task => (
          <div className="col-md-4 mb-3" key={task._id}>
            <TaskCard
              task={task}
              onDelete={handleDeleteTask} // Corrected prop name to handleDelete
              onUpdate={fetchTasks}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default Tasks;
