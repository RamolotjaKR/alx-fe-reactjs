import { useState } from 'react';
import './Navigation.css';

const Navigation = ({ onNavigate, currentView }) => {
  return (
    <nav className="navigation">
      <div className="nav-container">
        <h1 className="nav-logo">React Query Demo</h1>
        <div className="nav-buttons">
          <button
            className={`nav-btn ${currentView === 'forms' ? 'active' : ''}`}
            onClick={() => onNavigate('forms')}
          >
            📝 Form Examples
          </button>
          <button
            className={`nav-btn ${currentView === 'posts' ? 'active' : ''}`}
            onClick={() => onNavigate('posts')}
          >
            📰 Posts Data
          </button>
          <button
            className={`nav-btn ${currentView === 'users' ? 'active' : ''}`}
            onClick={() => onNavigate('users')}
          >
            👥 Users Data
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;
