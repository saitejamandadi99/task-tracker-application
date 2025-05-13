// src/components/Failure.js
import React from 'react';

const Failure = ({ message }) => {
  return (
    <div className="failure-container" style={styles.container}>
      <div className="failure-message" style={styles.message}>
        <h4>{message || "Something went wrong. Please try again."}</h4>
      </div>
    </div>
  );
};

const styles = {
  container: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    minHeight: '100vh',
  },
  message: {
    padding: '20px',
    border: '1px solid red',
    borderRadius: '5px',
    backgroundColor: 'rgba(255, 0, 0, 0.1)',
    color: 'red',
  },
};

export default Failure;
