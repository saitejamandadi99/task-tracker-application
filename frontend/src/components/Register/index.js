import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { FaUserPlus, FaCheckCircle } from 'react-icons/fa';
import Loader from '../Loader';
import 'bootstrap/dist/css/bootstrap.min.css';
import './index.css';

const apiStatusConstants = {
  INITIAL: 'INITIAL',
  IN_PROGRESS: 'IN_PROGRESS',
  SUCCESS: 'SUCCESS',
};

const Register = () => {
  const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    name: '',
    country: '',
  });
  const [message, setMessage] = useState('');
  const [success, setSuccess] = useState(false);
  const [apiStatus, setApiStatus] = useState(apiStatusConstants.INITIAL);
  const navigate = useNavigate();

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setApiStatus(apiStatusConstants.IN_PROGRESS);

    try {
      const res = await axios.post(`${API_BASE_URL}/api/auth/register`, formData);
      setMessage(res.data.message);
      setSuccess(true);
      setApiStatus(apiStatusConstants.SUCCESS);

      setTimeout(() => navigate('/'), 2000);
    } catch (error) {
      setSuccess(false);
      setMessage(error.response?.data?.message || 'Registration failed');
      setApiStatus(apiStatusConstants.INITIAL);
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
          </>
        );
    }
  };

  return (
    <div className="register-wrapper">
      <div className="register-card shadow">
        <h2 className="register-title text-center">
          <FaUserPlus className="mb-1" /> Register
        </h2>
        {renderSwitchView()}
      </div>
    </div>
  );
};

export default Register;
