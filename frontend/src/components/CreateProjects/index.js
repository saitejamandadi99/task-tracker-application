import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { FaPlusCircle } from 'react-icons/fa';
import 'bootstrap/dist/css/bootstrap.min.css';
import './index.css';

const CreateProject = () => {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    dueDate: '',
    status: 'To Do',
  });
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem('token');

    try {
      const res = await axios.post(
        'http://localhost:5000/api/projects/create',
        formData,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setMessage(res.data.message);
      setTimeout(() => navigate('/projects'), 1500); // Redirect to projects after creation
    } catch (error) {
      setMessage(error.response?.data?.message || 'Failed to create project');
    }
  };

  return (
    <div className="container mt-5">
      <div className="card shadow p-4">
        <h2 className="text-center mb-4">
          <FaPlusCircle className="mb-1" /> Create Project
        </h2>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            name="title"
            className="form-control mb-3"
            placeholder="Title"
            required
            onChange={handleChange}
          />
          <textarea
            name="description"
            className="form-control mb-3"
            placeholder="Description"
            rows="3"
            onChange={handleChange}
          ></textarea>
          <input
            type="date"
            name="dueDate"
            className="form-control mb-3"
            onChange={handleChange}
          />
          <select
            name="status"
            className="form-control mb-3"
            onChange={handleChange}
            defaultValue="To Do"
          >
            <option>To Do</option>
            <option>In Progress</option>
            <option>Completed</option>
            <option>On Hold</option>
          </select>
          <button className="btn btn-success w-100" type="submit">
            Create Project
          </button>
        </form>
        {message && <div className="alert alert-info mt-3">{message}</div>}
      </div>
    </div>
  );
};

export default CreateProject;
