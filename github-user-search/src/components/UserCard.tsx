import React from 'react';

interface UserCardProps {
  user: {
    login: string;
    avatar_url: string;
    html_url: string;
    name?: string;
    bio?: string;
    public_repos?: number;
    followers?: number;
    following?: number;
  };
}

const UserCard: React.FC<UserCardProps> = ({ user }) => {
  return (
    <div className="user-card">
      <img 
        src={user.avatar_url} 
        alt={user.login} 
        className="user-avatar"
      />
      <div className="user-info">
        <h2>{user.name || user.login}</h2>
        <p className="user-username">@{user.login}</p>
        {user.bio && <p className="user-bio">{user.bio}</p>}
        <div className="user-stats">
          <div className="stat">
            <strong>{user.public_repos || 0}</strong>
            <span>Repositories</span>
          </div>
          <div className="stat">
            <strong>{user.followers || 0}</strong>
            <span>Followers</span>
          </div>
          <div className="stat">
            <strong>{user.following || 0}</strong>
            <span>Following</span>
          </div>
        </div>
        <a 
          href={user.html_url} 
          target="_blank" 
          rel="noopener noreferrer"
          className="profile-link"
        >
          View Profile on GitHub
        </a>
      </div>
    </div>
  );
};

export default UserCard;
