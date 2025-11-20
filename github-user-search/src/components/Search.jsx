import { useState } from 'react';
import { fetchUserData } from '../services/githubService';
import './Search.css';

function Search() {
  const [username, setUsername] = useState('');
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!username.trim()) {
      return;
    }

    setLoading(true);
    setError(false);
    setUserData(null);

    try {
      const data = await fetchUserData(username);
      setUserData(data);
    } catch (err) {
      setError(true);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="search-component">
      <form onSubmit={handleSubmit} className="search-form">
        <div className="search-container">
          <input
            type="text"
            placeholder="Enter GitHub username..."
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="search-input"
          />
          <button type="submit" className="search-button">
            Search
          </button>
        </div>
      </form>

      <div className="results-container">
        {loading && <p className="loading-message">Loading...</p>}
        
        {error && (
          <p className="error-message">Looks like we cant find the user</p>
        )}
        
        {userData && !loading && !error && (
          <div className="user-result">
            <img 
              src={userData.avatar_url} 
              alt={userData.login}
              className="user-avatar-result"
            />
            <div className="user-info-result">
              <h2>{userData.name || userData.login}</h2>
              <p className="user-username-result">@{userData.login}</p>
              {userData.bio && <p className="user-bio-result">{userData.bio}</p>}
              <a 
                href={userData.html_url} 
                target="_blank" 
                rel="noopener noreferrer"
                className="profile-link-result"
              >
                View GitHub Profile
              </a>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default Search;
