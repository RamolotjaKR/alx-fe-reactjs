import { Link, Outlet } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import '../pages/Profile.css';

const Profile = () => {
  const { user } = useAuth();

  return (
    <div className="page-container">
      <h1>Profile Dashboard</h1>
      <p className="welcome-message">Welcome back, {user.username}! 👋</p>
      
      <div className="profile-layout">
        <nav className="profile-nav">
          <h3>Profile Sections</h3>
          <ul>
            <li>
              <Link to="/profile" end>Overview</Link>
            </li>
            <li>
              <Link to="/profile/details">Profile Details</Link>
            </li>
            <li>
              <Link to="/profile/settings">Settings</Link>
            </li>
          </ul>
        </nav>
        
        <div className="profile-content">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default Profile;
