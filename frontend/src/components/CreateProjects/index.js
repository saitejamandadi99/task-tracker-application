import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { FaPlusCircle } from 'react-icons/fa';
import 'bootstrap/dist/css/bootstrap.min.css';
import './index.css';
import Loader from '../Loader';

const apiStatusConstants = {
  INITIAL: 'INITIAL',
  IN_PROGRESS: 'IN_PROGRESS',
  SUCCESS: 'SUCCESS',
};

const CreateProject = () => {
  
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    dueDate: '',
    status: 'To Do',
  });

  const [message, setMessage] = useState('');
  const [apiStatus, setApiStatus] = useState(apiStatusConstants.INITIAL);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;
    const token = localStorage.getItem('token');
    setApiStatus(apiStatusConstants.IN_PROGRESS);

    try {
      const res = await axios.post(
        `${API_BASE_URL}/api/projects/create`,
        formData,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setMessage(res.data.message);
      setApiStatus(apiStatusConstants.SUCCESS);
      setTimeout(() => navigate('/projects'), 1500);
    } catch (error) {
      setMessage(error.response?.data?.message || 'Failed to create project');
      setApiStatus(apiStatusConstants.INITIAL);
    }
  };

  const renderContent = () => {
    switch (apiStatus) {
      case apiStatusConstants.IN_PROGRESS:
        return <Loader />;
      default:
        return (
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
              <button
                type="submit"
                className="btn btn-success create-project-btn w-100"
              >
                Create Project
              </button>
            </form>
            {message && <div className="alert alert-info mt-3">{message}</div>}
          </div>
        );
    }
  };

  return <div className="container mt-5">{renderContent()}</div>;
};

export default CreateProject;
