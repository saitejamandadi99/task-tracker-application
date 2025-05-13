// src/components/TaskCard.js
import React, { useState } from 'react';
import axios from 'axios';
import { FaEye, FaEdit, FaTrash, FaSave, FaTimes } from 'react-icons/fa';
import { useMediaQuery } from 'react-responsive';

const TaskCard = ({ task, onDelete, onUpdate }) => {
  const [details, setDetails] = useState(null);
  const [showEdit, setShowEdit] = useState(false);
  const isMobile = useMediaQuery({ query: '(max-width: 768px)' });
  const token = localStorage.getItem('token');

  const iconSize = isMobile ? 16 : 20;

  const handleView = async (e) => {
    e.stopPropagation();
    if (details) {
      setDetails(null);
      return;
    }
    try {
      const res = await axios.get(`http://localhost:5000/api/tasks/${task._id}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setDetails(res.data.task);
    } catch (err) {
      console.error('Error fetching task details:', err);
    }
  };

  const handleEditSubmit = async (e) => {
    e.preventDefault();
    const updatedTask = {
      title: e.target.title.value,
      description: e.target.description.value,
      status: e.target.status.value,
    };
    try {
      await axios.put(`http://localhost:5000/api/tasks/${task._id}`, updatedTask, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setShowEdit(false);
      setDetails(null);
      onUpdate();
    } catch (err) {
      console.error('Error updating task:', err);
    }
  };

  const toggleEdit = (e) => {
    e.stopPropagation();
    setShowEdit(prev => !prev);
  };

  return (
    <div className="card mb-3" onClick={e => e.stopPropagation()}>
      <div className="card-body">
        <h5 className="card-title">{task.title}</h5>
        <p className="card-text"><strong>Status:</strong> {task.status}</p>

        <div className="d-flex justify-content-start align-items-center gap-3 mb-2 flex-wrap">
          <FaEye
            size={iconSize}
            className="text-primary"
            onClick={handleView}
            style={{ cursor: 'pointer' }}
            title={details ? 'Hide Details' : 'View Details'}
          />
          <FaEdit
            size={iconSize}
            className="text-secondary"
            onClick={toggleEdit}
            style={{ cursor: 'pointer' }}
            title={showEdit ? 'Cancel Edit' : 'Edit Task'}
          />
          <FaTrash
            size={iconSize}
            className="text-danger"
            onClick={() => onDelete(task._id)}
            style={{ cursor: 'pointer' }}
            title="Delete Task"
          />
        </div>

        {details && (
          <div className="mt-3 border-top pt-2">
            <p><strong>Description:</strong> {details.description || 'N/A'}</p>
            <p><strong>Created:</strong> {new Date(details.createdAt).toLocaleDateString()}</p>
            <p><strong>Completed:</strong> {details.completedAt ? new Date(details.completedAt).toLocaleDateString() : 'N/A'}</p>
          </div>
        )}

          {showEdit && (
            <form className="mt-3" onSubmit={handleEditSubmit}>
              <div className="mb-2">
                <label className="form-label">Title</label>
                <input type="text" name="title" defaultValue={task.title} className="form-control" required />
              </div>
              <div className="mb-2">
                <label className="form-label">Description</label>
                <textarea name="description" defaultValue={task.description} className="form-control" rows="3" />
              </div>
              <div className="mb-3">
                <label className="form-label">Status</label>
                <select name="status" defaultValue={task.status} className="form-select">
                  <option value="To Do">To Do</option>
                  <option value="In Progress">In Progress</option>
                  <option value="Completed">Completed</option>
                </select>
              </div>
              <div className="d-flex justify-content-start gap-3">
                <button
                  type="submit"
                  className="btn btn-success btn-sm d-flex align-items-center justify-content-center"
                  title="Save"
                  style={{ width: '36px', height: '36px' }}
                >
                  <FaSave size={iconSize} />
                </button>
                <button
                  type="button"
                  className="btn btn-outline-secondary btn-sm d-flex align-items-center justify-content-center"
                  onClick={toggleEdit}
                  title="Cancel"
                  style={{ width: '36px', height: '36px' }}
                >
                  <FaTimes size={iconSize} />
                </button>
              </div>
            </form>
          )}

      </div>
    </div>
  );
};

export default TaskCard;
