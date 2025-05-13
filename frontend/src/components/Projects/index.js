import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { FaPlus, FaTrash } from 'react-icons/fa';
import TaskCard from '../TaskCard';
import './index.css';
import Loader from '../Loader';

const apiStatusConstants = {
  INITIAL: 'INITIAL',
  IN_PROGRESS: 'IN_PROGRESS',
  SUCCESS: 'SUCCESS',
};

const Projects = () => {
  const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;
  const [projects, setProjects] = useState([]);
  const [expandedProjectId, setExpandedProjectId] = useState(null);
  const [tasks, setTasks] = useState([]);
  const [projectApiStatus, setProjectApiStatus] = useState(apiStatusConstants.INITIAL);
  const [taskLoading, setTaskLoading] = useState(false);
  const navigate = useNavigate();
  const token = localStorage.getItem('token');

  useEffect(() => {
    if (!token) return navigate('/');
    const fetchProjects = async () => {

      setProjectApiStatus(apiStatusConstants.IN_PROGRESS);
      try {
        const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;
        const res = await axios.get(`${API_BASE_URL}/api/projects`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setProjects(res.data.projects);
        setProjectApiStatus(apiStatusConstants.SUCCESS);
      } catch (err) {
        setProjectApiStatus(apiStatusConstants.INITIAL);
      }
    };
    fetchProjects();
  }, [navigate, token]);

  const fetchTasks = async (projectId) => {
    setTaskLoading(true);
    try {
      const res = await axios.get(`${API_BASE_URL}/api/tasks/project/${projectId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setTasks(res.data.tasks);
    } catch (error) {
      console.error("Error fetching tasks:", error); // Log the error
      setTasks([]);
    } finally {
      setTaskLoading(false);
    }
  };

  const handleProjectClick = (projectId) => {
    if (expandedProjectId === projectId) {
      setExpandedProjectId(null);
    } else {
      setExpandedProjectId(projectId);
      fetchTasks(projectId);
    }
  };

  const handleDeleteTask = async (taskId) => {
    try {
      await axios.delete(`${API_BASE_URL}/api/tasks/${taskId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setTasks(tasks.filter((t) => t._id !== taskId));
    } catch (error) {
      console.error("Error deleting task:", error); // Log the error.  Important for debugging
    }
  };

  const handleDeleteProject = async (e, projectId) => {
    e.stopPropagation();
    const confirmDelete = window.confirm('Are you sure you want to delete this project and all its tasks?');
    if (!confirmDelete) return;
    try {
      await axios.delete(`${API_BASE_URL}/api/projects/${projectId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setProjects(projects.filter((p) => p._id !== projectId));
      if (expandedProjectId === projectId) {
        setExpandedProjectId(null);
        setTasks([]);
      }
    } catch (error) {
      console.error('Failed to delete project:', error); // Log the error
    }
  };

  const renderProjectsView = () => {
    switch (projectApiStatus) {
      case apiStatusConstants.IN_PROGRESS:
        return <Loader />;
      case apiStatusConstants.SUCCESS:
        return (
          <div className="project-grid">
            {projects.map((project) => (
              <div className="project-card" key={project._id} onClick={() => handleProjectClick(project._id)}>
                <div className="project-header d-flex justify-content-between align-items-center">
                  <h5 className="fw-bold mb-0">{project.title}</h5>
                  <FaTrash
                    className="text-danger delete-icon"
                    onClick={(e) => handleDeleteProject(e, project._id)}
                    title="Delete Project"
                  />
                </div>
                <p className="mb-1">
                  <strong>Status:</strong> {project.status}
                </p>
                <p className="mb-2">
                  <strong>Due:</strong> {project.dueDate ? new Date(project.dueDate).toLocaleDateString() : 'N/A'}
                </p>

                {expandedProjectId === project._id && (
                  <div className="task-list">
                    <h6 className="fw-semibold">Tasks:</h6>
                    {taskLoading ? (
                      <Loader />
                    ) : tasks.length > 0 ? (
                      tasks.map((task) => (
                        <TaskCard
                          key={task._id}
                          task={task}
                          onDelete={handleDeleteTask}
                          onUpdate={() => fetchTasks(project._id)}
                        />
                      ))
                    ) : (
                      <p className="text-muted">No tasks found.</p>
                    )}
                    <button
                      className="btn btn-outline-primary btn-sm mt-3"
                      onClick={(e) => {
                        e.stopPropagation();
                        navigate(`/create-task/${project._id}`);
                      }}
                    >
                      <FaPlus className="me-1" /> Add Task
                    </button>
                  </div>
                )}
              </div>
            ))}
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="container projects-container mt-5">
      <h2 className="text-center mb-4">My Projects</h2>
      {renderProjectsView()}

      <div className="text-center mt-5">
        <button className="btn btn-success px-4 py-2" onClick={() => navigate("/create-project")}>
          <FaPlus className="me-2" /> Create Project
        </button>
      </div>
    </div>
  );
};

export default Projects;
