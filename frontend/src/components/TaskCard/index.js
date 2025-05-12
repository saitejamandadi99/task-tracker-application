import React, { useState } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import './index.css';

const TaskCard = ({ task, onDelete, onUpdate }) => {
  const [details, setDetails] = useState(null);
  const [message, setMessage] = useState('');
  const [showEdit, setShowEdit] = useState(false);
  const [formData, setFormData] = useState({
    title: task.title,
    description: task.description,
    status: task.status,
  });

  const token = localStorage.getItem('token');

  // View Button Handler
  const handleView = async () => {
    console.log('View button clicked');
    try {
      const res = await axios.get(`http://localhost:5000/api/tasks/${task._id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setDetails(res.data.task);
    } catch (error) {
      setMessage(error.response?.data?.message || 'Failed to fetch details');
    }
  };

  // Delete Button Handler
  const handleDelete = () => {
    console.log('Delete button clicked');
    onDelete(task._id);
  };

  // Edit Button Handler
  const handleEdit = () => {
    console.log('Edit button clicked');
    setShowEdit(true);
  };

  // Submit edited data
  const handleEditSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put(
        `http://localhost:5000/api/tasks/${task._id}`,
        formData,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setShowEdit(false);
      onUpdate(); // Refresh the parent list
    } catch (err) {
      setMessage(err.response?.data?.message || 'Update failed');
    }
  };

  return (
    <div className="card shadow-sm p-3 h-100">
      <h5>{task.title}</h5>
      <p>Status: <strong>{task.status}</strong></p>

      <div className="d-flex justify-content-between mt-2">
        <button className="btn btn-outline-primary btn-sm" onClick={handleView}>
          View
        </button>
        <button className="btn btn-outline-secondary btn-sm" onClick={handleEdit}>
          Edit
        </button>
        <button className="btn btn-outline-danger btn-sm" onClick={handleDelete}>
          Delete
        </button>
      </div>

      {details && (
        <div className="mt-3 border-top pt-2">
          <h6>Details:</h6>
          <p>{details.description}</p>
          <p>Created: {new Date(details.createdAt).toLocaleDateString()}</p>
          <p>Completed: {details.completedAt ? new Date(details.completedAt).toLocaleDateString() : 'N/A'}</p>
        </div>
      )}

      {showEdit && (
        <form className="mt-3" onSubmit={handleEditSubmit}>
          <input
            className="form-control mb-2"
            value={formData.title}
            onChange={(e) => setFormData({ ...formData, title: e.target.value })}
            placeholder="Title"
          />
          <textarea
            className="form-control mb-2"
            value={formData.description}
            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
            placeholder="Description"
          />
          <select
            className="form-select mb-2"
            value={formData.status}
            onChange={(e) => setFormData({ ...formData, status: e.target.value })}
          >
            <option value="To Do">To Do</option>
            <option value="In Progress">In Progress</option>
            <option value="Completed">Completed</option>
          </select>
          <div className="d-flex justify-content-end">
            <button className="btn btn-sm btn-success me-2" type="submit">Save</button>
            <button className="btn btn-sm btn-secondary" onClick={() => setShowEdit(false)}>Cancel</button>
          </div>
        </form>
      )}

      {message && <div className="alert alert-warning mt-2">{message}</div>}
    </div>
  );
};

export default TaskCard;
