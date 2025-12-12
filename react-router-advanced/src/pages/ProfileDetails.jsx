import { useAuth } from '../contexts/AuthContext';
import './ProfileShared.css';

const ProfileDetails = () => {
  const { user } = useAuth();

  return (
    <div>
      <h2>Profile Details</h2>
      <p>View and manage your detailed profile information.</p>
      
      <div style={{ marginTop: '2rem' }}>
        <div className="info-card">
          <h3>Personal Information</h3>
          <div className="detail-row">
            <span className="detail-label">Full Name:</span>
            <span className="detail-value">{user.username}</span>
          </div>
          <div className="detail-row">
            <span className="detail-label">Email:</span>
            <span className="detail-value">{user.username.toLowerCase()}@example.com</span>
          </div>
          <div className="detail-row">
            <span className="detail-label">Phone:</span>
            <span className="detail-value">+1 (555) 123-4567</span>
          </div>
          <div className="detail-row">
            <span className="detail-label">Location:</span>
            <span className="detail-value">New York, USA</span>
          </div>
        </div>
        
        <div className="info-card" style={{ marginTop: '1rem' }}>
          <h3>Bio</h3>
          <p style={{ lineHeight: '1.6', color: 'rgba(255, 255, 255, 0.8)' }}>
            Passionate developer interested in React, web technologies, and building amazing user experiences.
            Always learning and exploring new tools and frameworks.
          </p>
        </div>
        
        <div className="info-card" style={{ marginTop: '1rem' }}>
          <h3>Skills</h3>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem', marginTop: '0.5rem' }}>
            {['React', 'JavaScript', 'TypeScript', 'Node.js', 'CSS', 'React Router'].map(skill => (
              <span key={skill} className="skill-badge">{skill}</span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileDetails;
