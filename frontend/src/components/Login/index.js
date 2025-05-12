import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { FaSignInAlt } from 'react-icons/fa';
import 'bootstrap/dist/css/bootstrap.min.css';
import './index.css';

const Login = () => {
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [message, setMessage] = useState('');

  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post('http://localhost:5000/api/auth/login', formData);
      setMessage(res.data.message);
      localStorage.setItem('user', JSON.stringify(res.data.user));
    } catch (error) {
      setMessage(error.response?.data?.message || 'Login failed');
    }
  };

  return (
    <div className="login-wrapper">
      <div className="login-card shadow">
        <h2 className="login-title text-center">
          <FaSignInAlt className="mb-1" /> Login
        </h2>
        <form onSubmit={handleSubmit}>
          <input type="email" className="form-control mb-3" name="email" placeholder="Email" required onChange={handleChange} />
          <input type="password" className="form-control mb-3" name="password" placeholder="Password" required onChange={handleChange} />
          <button className="btn btn-success w-100" type="submit">Login</button>
        </form>
        {message && <div className="alert alert-info mt-3">{message}</div>}
        <div className="text-center mt-3">
        <span>Don't have an account? </span>
        <Link to="/register">Register here</Link>
      </div>
      </div>
    </div>
  );
};

export default Login;
