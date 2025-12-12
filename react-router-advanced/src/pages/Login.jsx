import { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import './Login.css';

const Login = () => {
  const [username, setUsername] = useState('');
  const { login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  // Get the page user was trying to access
  const from = location.state?.from?.pathname || '/profile';

  const handleSubmit = (e) => {
    e.preventDefault();
    if (username.trim()) {
      login(username);
      // Redirect to the page they were trying to access or profile
      navigate(from, { replace: true });
    }
  };

  return (
    <div className="page-container">
      <div className="login-container">
        <h1>Login</h1>
        <p className="login-info">
          Enter any username to simulate login (no password required)
        </p>
        <form onSubmit={handleSubmit} className="login-form">
          <div className="form-group">
            <label htmlFor="username">Username:</label>
            <input
              type="text"
              id="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Enter username"
              autoFocus
            />
          </div>
          <button type="submit" className="login-button">
            Login
          </button>
        </form>
        <div className="login-help">
          <p>💡 This is a demo authentication system.</p>
          <p>Try accessing the Profile page to see protected routes in action!</p>
        </div>
      </div>
    </div>
  );
};

export default Login;
