import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { FaPlus } from 'react-icons/fa';
import './index.css';

const Projects = () => {
  const [projects, setProjects] = useState([]);
  const [expandedProjectId, setExpandedProjectId] = useState(null);
  const [tasks, setTasks] = useState([]);
  const navigate = useNavigate();

  const token = localStorage.getItem('token');

  useEffect(() => {
    if (!token) {
      navigate('/'); // Redirect to login if no token
      return;
    }

    const fetchProjects = async () => {
      try {
        const res = await axios.get('http://localhost:5000/api/projects', {
          headers: { Authorization: `Bearer ${token}` }
        });
        setProjects(res.data.projects);
      } catch (err) {
        console.error(err);
      }
    };

    fetchProjects();
  }, [navigate, token]);

  const handleCreate = () => {
    navigate('/create-project'); // Navigate to create project page
  };

  const handleAddTask = (projectId, e) => {
    e.stopPropagation(); // Prevent triggering project expand
    navigate(`/create-task/${projectId}`); // Navigate to task creation page
  };

  const handleProjectClick = async (projectId) => {
    if (expandedProjectId === projectId) {
      setExpandedProjectId(null);
      return;
    }

    setExpandedProjectId(projectId);
    try {
        const res = await axios.get(`http://localhost:5000/api/tasks/project/${projectId}`, {
            headers: { Authorization: `Bearer ${token}` }
          });
          
      setTasks(res.data.tasks);
    } catch (err) {
      console.error('Failed to fetch tasks:', err);
    }
  };

  return (
    <div className="projects-container">
      <h2 className="text-center mb-4">My Projects</h2>

      <div className="project-grid">
        {projects.map((project) => (
          <div
            key={project._id}
            className="project-card"
            onClick={() => handleProjectClick(project._id)}
          >
            <h4>{project.title}</h4>
            <p>Status: {project.status}</p>
            <p>Due: {project.dueDate ? new Date(project.dueDate).toLocaleDateString() : 'N/A'}</p>

            {expandedProjectId === project._id && (
              <div className="task-list mt-3">
                <h6>Tasks:</h6>
                {tasks.length > 0 ? (
                  tasks.map((task) => (
                    <div key={task._id} className="task-item">
                      <strong>{task.title}</strong> - {task.status}
                    </div>
                  ))
                ) : (
                  <p>No tasks found.</p>
                )}

                <button
                  className="btn btn-sm btn-outline-primary mt-2"
                  onClick={(e) => handleAddTask(project._id, e)}
                >
                  <FaPlus /> Add Task
                </button>
              </div>
            )}
          </div>
        ))}
      </div>

      <button className="create-btn" onClick={handleCreate}>
        <FaPlus /> Create Project
      </button>
    </div>
  );
};

export default Projects;
