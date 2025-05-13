import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import Loader from '../Loader';

const apiStatusConstants = {
  INITIAL: 'INITIAL',
  IN_PROGRESS: 'IN_PROGRESS',
  SUCCESS: 'SUCCESS',
};

const CreateTask = () => {
  const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;
  const { projectId } = useParams();
  const navigate = useNavigate();
  const token = localStorage.getItem('token');

  const [task, setTask] = useState({
    title: '',
    description: '',
    status: 'To Do',
  });

  const [apiStatus, setApiStatus] = useState(apiStatusConstants.INITIAL);

  const handleChange = (e) => {
    setTask({ ...task, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setApiStatus(apiStatusConstants.IN_PROGRESS);

    try {
      await axios.post(
        `${API_BASE_URL}/api/tasks`,
        { ...task, projectId },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setApiStatus(apiStatusConstants.SUCCESS);
      navigate('/projects');
    } catch (error) {
      setApiStatus(apiStatusConstants.INITIAL);
      console.error('Error creating task:', error.response?.data?.message || error.message);
    }
  };

  const renderSwitchView = () => {
    switch (apiStatus) {
      case apiStatusConstants.IN_PROGRESS:
        return <Loader />;
      default:
        return (
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
        );
    }
  };

  return (
    <div className="container mt-4">
      <h3>Create Task</h3>
      {renderSwitchView()}
    </div>
  );
};

export default CreateTask;
