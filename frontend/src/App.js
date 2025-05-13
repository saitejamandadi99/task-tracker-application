import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Register from './components/Register';
import Login from './components/Login';
import ProtectedRoute from './components/ProtectedRoute'; 
import Tasks from './components/Tasks';
import Projects from './components/Projects'; 
import './App.css'; 
import CreateProject from './components/CreateProjects';
import CreateTask from './components/CreateTask';
import Header from './components/Header';

function App() {
  return (
    <>
    
    <Router>
    <Header />
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/tasks" element={<ProtectedRoute><Tasks /></ProtectedRoute>} />
        <Route path="/projects" element={<ProtectedRoute><Projects /></ProtectedRoute>} />
        <Route path="/create-project" element={<ProtectedRoute><CreateProject /></ProtectedRoute>} />
        <Route path="/create-task/:projectId" element={<CreateTask />} />
      </Routes>
    </Router>
    </>
    
  );
}

export default App;
