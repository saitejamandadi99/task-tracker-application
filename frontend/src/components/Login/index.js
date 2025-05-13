import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import { FaSignInAlt } from 'react-icons/fa';
import Loader from '../Loader';
import 'bootstrap/dist/css/bootstrap.min.css';
import './index.css';

const apiStatusConstants = {
  INITIAL: 'INITIAL',
  IN_PROGRESS: 'IN_PROGRESS',
  SUCCESS: 'SUCCESS',
};

const Login = () => {
  const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [message, setMessage] = useState('');
  const [apiStatus, setApiStatus] = useState(apiStatusConstants.INITIAL);
  const navigate = useNavigate();

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setApiStatus(apiStatusConstants.IN_PROGRESS);

    try {
      const res = await axios.post(`${API_BASE_URL}/api/auth/login`, formData);
      const token = res.data.user.token;

      if (token) {
        localStorage.setItem('token', token);
        setMessage('Login successful!');
        setApiStatus(apiStatusConstants.SUCCESS);
        navigate('/projects');
      } else {
        setMessage('Token not received. Login failed.');
        setApiStatus(apiStatusConstants.INITIAL); // Changed to INITIAL
      }
    } catch (error) {
      setMessage(error.response?.data?.message || 'Login failed');
      setApiStatus(apiStatusConstants.INITIAL); // Changed to INITIAL
    }
  };

  const renderSwitchView = () => {
    switch (apiStatus) {
      case apiStatusConstants.IN_PROGRESS:
        return <Loader />;
      case apiStatusConstants.SUCCESS:
        return null;
      default:
        return (
          <>
            <form onSubmit={handleSubmit}>
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
              <button className="btn btn-success w-100" type="submit">
                Login
              </button>
            </form>
            {message && <div className="alert alert-info mt-3">{message}</div>}
            <div className="text-center mt-3">
              <span>Don't have an account? </span>
              <Link to="/register">Register here</Link>
            </div>
          </>
        );
    }
  };

  return (
    <div className="login-wrapper">
      <div className="login-card shadow">
        <h2 className="login-title text-center">
          <FaSignInAlt className="mb-1" /> Login
        </h2>
        {renderSwitchView()}
      </div>
    </div>
  );
};

export default Login;
