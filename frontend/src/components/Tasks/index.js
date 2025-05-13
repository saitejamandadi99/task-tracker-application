import React, { useEffect, useState, useCallback } from 'react';
import axios from 'axios';
import TaskCard from '../TaskCard';
import { useParams, useNavigate } from 'react-router-dom';
import { FaPlus } from 'react-icons/fa';
import 'bootstrap/dist/css/bootstrap.min.css';
import './index.css';
import Loader from '../Loader';

const apiStatusConstants = {
  INITIAL: 'INITIAL',
  IN_PROGRESS: 'IN_PROGRESS',
  SUCCESS: 'SUCCESS',
};

const Tasks = () => {
  const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;
  const { projectId } = useParams();
  const [tasks, setTasks] = useState([]);
  const [fetchStatus, setFetchStatus] = useState(apiStatusConstants.INITIAL);
  const [deleteStatus, setDeleteStatus] = useState(apiStatusConstants.INITIAL);
  const navigate = useNavigate();

  const fetchTasks = useCallback(async (projectId) => {
    setFetchStatus(apiStatusConstants.IN_PROGRESS);
    const token = localStorage.getItem('token');
    try {
      const res = await axios.get(`${API_BASE_URL}/api/tasks/project/${projectId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setTasks(res.data.tasks);
      setFetchStatus(apiStatusConstants.SUCCESS);
    } catch (error) {
      console.error('Failed to fetch tasks:', error);
      setFetchStatus(apiStatusConstants.INITIAL);
    }
  }, [API_BASE_URL]); // Added API_BASE_URL as a dependency

  useEffect(() => {
    fetchTasks(projectId);
  }, [fetchTasks, projectId]); // fetchTasks is already useCallback, and projectId

  const handleDeleteTask = async (taskId) => {
    setDeleteStatus(apiStatusConstants.IN_PROGRESS);
    const token = localStorage.getItem('token');
    try {
      await axios.delete(`${API_BASE_URL}/api/tasks/${taskId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setTasks(tasks.filter((task) => task._id !== taskId));
      setDeleteStatus(apiStatusConstants.SUCCESS);
    } catch (error) {
      console.error('Delete failed:', error);
      setDeleteStatus(apiStatusConstants.INITIAL);
    } finally {
      setTimeout(() => {
        setDeleteStatus(apiStatusConstants.INITIAL);
      }, 1500);
    }
  };

  const handleCreate = () => {
    navigate(`/create-task/${projectId}`);
  };

  const renderTasksView = () => {
    switch (fetchStatus) {
      case apiStatusConstants.IN_PROGRESS:
        return <Loader />;
      case apiStatusConstants.SUCCESS:
        return (
          <div className="row">
            {tasks.map((task) => (
              <div className="col-md-4 mb-3" key={task._id}>
                <TaskCard
                  task={task}
                  onDelete={handleDeleteTask}
                  onUpdate={() => fetchTasks(projectId)} // Pass projectId to fetchTasks
                />
              </div>
            ))}
            {tasks.length === 0 && (
              <p className="text-muted">No tasks found for this project.</p>
            )}
          </div>
        );
      default:
        return <p className="text-muted">Failed to load tasks.</p>;
    }
  };

  const renderDeleteStatus = () => {
    switch (deleteStatus) {
      case apiStatusConstants.IN_PROGRESS:
        return <div className="alert alert-info">Deleting task...</div>;
      case apiStatusConstants.SUCCESS:
        return <div className="alert alert-success">Task deleted successfully.</div>;
      default:
        return null;
    }
  };

  return (
    <div className="container mt-4">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h3>Tasks</h3>
        <button className="btn btn-primary" onClick={handleCreate}>
          <FaPlus className="me-2" /> Add Task
        </button>
      </div>

      {renderDeleteStatus()}
      {renderTasksView()}
    </div>
  );
};

export default Tasks;
