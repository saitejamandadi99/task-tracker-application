// frontend/src/components/Tasks.js
import React, { useEffect, useState, useCallback } from 'react';
import axios from 'axios';
import TaskCard from '../TaskCard';
import { useParams, useNavigate } from 'react-router-dom';
import { FaPlus } from 'react-icons/fa';
import 'bootstrap/dist/css/bootstrap.min.css';
import './index.css';
import Loader from '../Loader'; // Assuming you have a Loader component
import Failure from '../Failure'; // Assuming you have a Failure component

const apiStatusConstants = {
  INITIAL: 'INITIAL',
  IN_PROGRESS: 'IN_PROGRESS',
  SUCCESS: 'SUCCESS',
  FAILURE: 'FAILURE',
};

const Tasks = () => {
  const { projectId } = useParams();
  const [tasks, setTasks] = useState([]);
  const [fetchStatus, setFetchStatus] = useState(apiStatusConstants.INITIAL);
  const [deleteStatus, setDeleteStatus] = useState(apiStatusConstants.INITIAL);
  const navigate = useNavigate();

  const fetchTasks = useCallback(async () => {
    setFetchStatus(apiStatusConstants.IN_PROGRESS);
    const token = localStorage.getItem('token');
    try {
      const res = await axios.get(`http://localhost:5000/api/tasks/project/${projectId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setTasks(res.data.tasks);
      setFetchStatus(apiStatusConstants.SUCCESS);
    } catch (error) {
      console.error('Failed to fetch tasks:', error);
      setFetchStatus(apiStatusConstants.FAILURE);
    }
  }, [projectId]);

  useEffect(() => {
    fetchTasks();
  }, [fetchTasks]);

  const handleDeleteTask = async (taskId) => {
    setDeleteStatus(apiStatusConstants.IN_PROGRESS);
    const token = localStorage.getItem('token');
    try {
      await axios.delete(`http://localhost:5000/api/tasks/${taskId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setTasks(tasks.filter(task => task._id !== taskId));
      setDeleteStatus(apiStatusConstants.SUCCESS);
    } catch (error) {
      console.error('Delete failed:', error);
      setDeleteStatus(apiStatusConstants.FAILURE);
    } finally {
      // Reset delete status after a short delay
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
      case apiStatusConstants.FAILURE:
        return <Failure message="Failed to load tasks." />;
      case apiStatusConstants.SUCCESS:
        return (
          <div className="row">
            {tasks.map(task => (
              <div className="col-md-4 mb-3" key={task._id}>
                <TaskCard
                  task={task}
                  onDelete={handleDeleteTask}
                  onUpdate={fetchTasks}
                />
              </div>
            ))}
            {tasks.length === 0 && <p className="text-muted">No tasks found for this project.</p>}
          </div>
        );
      default:
        return null;
    }
  };

  const renderDeleteStatus = () => {
    switch (deleteStatus) {
      case apiStatusConstants.IN_PROGRESS:
        return <div className="alert alert-info">Deleting task...</div>;
      case apiStatusConstants.FAILURE:
        return <div className="alert alert-danger">Failed to delete task.</div>;
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