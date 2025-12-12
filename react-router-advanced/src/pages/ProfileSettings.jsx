import { useState } from 'react';
import './ProfileShared.css';

const ProfileSettings = () => {
  const [emailNotifications, setEmailNotifications] = useState(true);
  const [pushNotifications, setPushNotifications] = useState(false);
  const [publicProfile, setPublicProfile] = useState(true);
  const [darkMode, setDarkMode] = useState(true);

  const handleSave = (e) => {
    e.preventDefault();
    alert('Settings saved successfully! (This is a demo)');
  };

  return (
    <div>
      <h2>Settings</h2>
      <p>Manage your account preferences and settings.</p>
      
      <form onSubmit={handleSave} style={{ marginTop: '2rem' }}>
        <div className="info-card">
          <h3>Notifications</h3>
          <div className="setting-item">
            <label>
              <input
                type="checkbox"
                checked={emailNotifications}
                onChange={(e) => setEmailNotifications(e.target.checked)}
              />
              <span>Email Notifications</span>
            </label>
            <p className="setting-description">Receive email updates about your account activity</p>
          </div>
          
          <div className="setting-item">
            <label>
              <input
                type="checkbox"
                checked={pushNotifications}
                onChange={(e) => setPushNotifications(e.target.checked)}
              />
              <span>Push Notifications</span>
            </label>
            <p className="setting-description">Get push notifications on your device</p>
          </div>
        </div>
        
        <div className="info-card" style={{ marginTop: '1rem' }}>
          <h3>Privacy</h3>
          <div className="setting-item">
            <label>
              <input
                type="checkbox"
                checked={publicProfile}
                onChange={(e) => setPublicProfile(e.target.checked)}
              />
              <span>Public Profile</span>
            </label>
            <p className="setting-description">Make your profile visible to other users</p>
          </div>
        </div>
        
        <div className="info-card" style={{ marginTop: '1rem' }}>
          <h3>Appearance</h3>
          <div className="setting-item">
            <label>
              <input
                type="checkbox"
                checked={darkMode}
                onChange={(e) => setDarkMode(e.target.checked)}
              />
              <span>Dark Mode</span>
            </label>
            <p className="setting-description">Use dark theme for the interface</p>
          </div>
        </div>
        
        <button type="submit" className="save-button">
          Save Settings
        </button>
      </form>
    </div>
  );
};

export default ProfileSettings;
