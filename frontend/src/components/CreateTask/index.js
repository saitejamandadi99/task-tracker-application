import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

const CreateTask = () => {
  const { projectId } = useParams();
  const navigate = useNavigate();
  const token = localStorage.getItem('token');

  const [task, setTask] = useState({
    title: '',
    description: '',
    status: 'To Do'
  });

  const handleChange = (e) => {
    setTask({ ...task, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await axios.post(
        'http://localhost:5000/api/tasks',
        { ...task, projectId },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      navigate('/projects');
    } catch (error) {
      console.error('Error creating task:', error.response?.data?.message || error.message);
    }
  };

  return (
    <div className="container mt-4">
      <h3>Create Task</h3>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Title</label>
          <input
            name="title"
            className="form-control"
            value={task.title}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group mt-2">
          <label>Description</label>
          <textarea
            name="description"
            className="form-control"
            value={task.description}
            onChange={handleChange}
          />
        </div>
        <div className="form-group mt-2">
          <label>Status</label>
          <select
            name="status"
            className="form-control"
            value={task.status}
            onChange={handleChange}
          >
            <option value="To Do">To Do</option>
            <option value="In Progress">In Progress</option>
            <option value="Completed">Completed</option>
            <option value="On Hold">On Hold</option>
          </select>
        </div>
        <button className="btn btn-success mt-3" type="submit">
          Create Task
        </button>
      </form>
    </div>
  );
};

export default CreateTask;
