import { useAuth } from '../contexts/AuthContext';
import './ProfileShared.css';

const ProfileOverview = () => {
  const { user } = useAuth();

  return (
    <div>
      <h2>Profile Overview</h2>
      <p>This is your profile dashboard. Use the sidebar to navigate to different sections.</p>
      
      <div style={{ marginTop: '2rem' }}>
        <div className="info-card">
          <h3>Account Information</h3>
          <p><strong>User ID:</strong> {user.id}</p>
          <p><strong>Username:</strong> {user.username}</p>
          <p><strong>Status:</strong> <span style={{ color: '#4ade80' }}>Active</span></p>
        </div>
        
        <div className="info-card" style={{ marginTop: '1rem' }}>
          <h3>Quick Stats</h3>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '1rem', marginTop: '1rem' }}>
            <div className="stat-box">
              <div className="stat-value">12</div>
              <div className="stat-label">Posts</div>
            </div>
            <div className="stat-box">
              <div className="stat-value">45</div>
              <div className="stat-label">Followers</div>
            </div>
            <div className="stat-box">
              <div className="stat-value">38</div>
              <div className="stat-label">Following</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileOverview;
