import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { FaUserPlus, FaCheckCircle } from 'react-icons/fa';
import 'bootstrap/dist/css/bootstrap.min.css';
import './index.css';

const Register = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    name: '',
    country: '',
  });
  const [message, setMessage] = useState('');
  const [success, setSuccess] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(
        'http://localhost:5000/api/auth/register',
        formData
      );
      setMessage(res.data.message);
      setSuccess(true);

      // Delay then redirect to login
      setTimeout(() => {
        navigate('/');
      }, 2000);
    } catch (error) {
      setSuccess(false);
      setMessage(error.response?.data?.message || 'Registration failed');
    }
  };

  return (
    <div className="register-wrapper">
      <div className="register-card shadow">
        <h2 className="register-title text-center">
          <FaUserPlus className="mb-1" /> Register
        </h2>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            className="form-control mb-3"
            name="name"
            placeholder="Name"
            required
            onChange={handleChange}
          />
          <input
            type="email"
            className="form-control mb-3"
            name="email"
            placeholder="Email"
            required
            onChange={handleChange}
          />
          <input
            type="password"
            className="form-control mb-3"
            name="password"
            placeholder="Password"
            required
            onChange={handleChange}
          />
          <input
            type="text"
            className="form-control mb-3"
            name="country"
            placeholder="Country"
            required
            onChange={handleChange}
          />
          <button className="btn btn-primary w-100" type="submit">
            Register
          </button>
        </form>

        {message && (
          <div
            className={`alert mt-3 ${
              success ? 'alert-success' : 'alert-danger'
            } d-flex align-items-center gap-2`}
          >
            {success && <FaCheckCircle />} {message}
          </div>
        )}

        <div className="text-center mt-3">
          <span>Already have an account? </span>
          <Link to="/">Login here</Link>
        </div>
      </div>
    </div>
  );
};

export default Register;
