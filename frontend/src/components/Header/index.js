import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaBars, FaHome, FaSignOutAlt } from 'react-icons/fa';
import 'bootstrap/dist/css/bootstrap.min.css';
import './index.css';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/');
  };

  const handleHome = () => {
    navigate('/projects');
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <header className="navbar navbar-expand-lg navbar-light bg-light">
      <div className="container">
        <button className="navbar-toggler" type="button" onClick={toggleMenu}>
          <FaBars />
        </button>
        <div className={`collapse navbar-collapse ${isMenuOpen ? 'show' : ''}`}>
          <ul className="navbar-nav ms-auto">
            <li className="nav-item">
              <button className="btn btn-link" onClick={handleHome}>
                <FaHome className="me-2" /> Home
              </button>
            </li>
            <li className="nav-item">
              <button className="btn btn-link" onClick={handleLogout}>
                <FaSignOutAlt className="me-2" /> Logout
              </button>
            </li>
          </ul>
        </div>
      </div>
    </header>
  );
};

export default Header;
