import { useQuery } from '@tanstack/react-query';
import { useState } from 'react';
import './UsersComponent.css';

// Function to fetch users from JSONPlaceholder API
const fetchUsers = async () => {
  const response = await fetch('https://jsonplaceholder.typicode.com/users');
  
  if (!response.ok) {
    throw new Error('Failed to fetch users');
  }
  
  return response.json();
};

// Function to fetch user's posts
const fetchUserPosts = async (userId) => {
  const response = await fetch(`https://jsonplaceholder.typicode.com/posts?userId=${userId}`);
  
  if (!response.ok) {
    throw new Error('Failed to fetch user posts');
  }
  
  return response.json();
};

const UsersComponent = () => {
  const [selectedUserId, setSelectedUserId] = useState(null);

  // Query for fetching all users
  const { 
    data: users, 
    isLoading: usersLoading, 
    isError: usersError, 
    error: usersErrorMessage,
    refetch: refetchUsers,
    isFetching: usersFetching
  } = useQuery({
    queryKey: ['users'],
    queryFn: fetchUsers,
    staleTime: 10000, // 10 seconds
    cacheTime: 15 * 60 * 1000, // 15 minutes
  });

  // Query for fetching selected user's posts (dependent query)
  const { 
    data: userPosts, 
    isLoading: postsLoading,
    isError: postsError,
    isFetching: postsFetching
  } = useQuery({
    queryKey: ['userPosts', selectedUserId],
    queryFn: () => fetchUserPosts(selectedUserId),
    enabled: !!selectedUserId, // Only run when a user is selected
    staleTime: 5000,
    cacheTime: 10 * 60 * 1000,
  });

  const handleUserClick = (userId) => {
    setSelectedUserId(userId === selectedUserId ? null : userId);
  };

  if (usersLoading) {
    return (
      <div className="users-container">
        <div className="loading">
          <div className="spinner"></div>
          <p>Loading users...</p>
        </div>
      </div>
    );
  }

  if (usersError) {
    return (
      <div className="users-container">
        <div className="error-box">
          <h3>Error fetching users</h3>
          <p>{usersErrorMessage.message}</p>
          <button onClick={() => refetchUsers()} className="refetch-btn">
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="users-container">
      <div className="users-header">
        <h2>Users Directory</h2>
        <div className="header-actions">
          <button 
            onClick={() => refetchUsers()} 
            className="refetch-btn"
            disabled={usersFetching}
          >
            {usersFetching ? 'Refreshing...' : 'Refetch Users'}
          </button>
          {usersFetching && <span className="fetching-indicator">🔄 Fetching...</span>}
        </div>
      </div>

      <div className="users-info">
        <p>
          👥 Total Users: <strong>{users?.length || 0}</strong>
        </p>
        <p className="cache-note">
          💡 <strong>Dependent Query Demo:</strong> Click on a user to fetch their posts dynamically!
        </p>
      </div>

      <div className="users-grid">
        {users?.map((user) => (
          <div 
            key={user.id} 
            className={`user-card ${selectedUserId === user.id ? 'selected' : ''}`}
            onClick={() => handleUserClick(user.id)}
          >
            <div className="user-header">
              <div className="user-avatar">{user.name.charAt(0)}</div>
              <div className="user-basic">
                <h3 className="user-name">{user.name}</h3>
                <p className="user-username">@{user.username}</p>
              </div>
            </div>

            <div className="user-details">
              <div className="detail-item">
                <span className="detail-icon">📧</span>
                <span className="detail-text">{user.email}</span>
              </div>
              <div className="detail-item">
                <span className="detail-icon">📞</span>
                <span className="detail-text">{user.phone}</span>
              </div>
              <div className="detail-item">
                <span className="detail-icon">🌐</span>
                <span className="detail-text">{user.website}</span>
              </div>
              <div className="detail-item">
                <span className="detail-icon">🏢</span>
                <span className="detail-text">{user.company.name}</span>
              </div>
            </div>

            {selectedUserId === user.id && (
              <div className="user-posts-section">
                <div className="posts-header-inline">
                  <h4>User's Posts</h4>
                  {postsFetching && <span className="loading-small">Loading...</span>}
                </div>
                
                {postsLoading && (
                  <div className="posts-loading">
                    <div className="spinner-small"></div>
                    <p>Loading posts...</p>
                  </div>
                )}

                {postsError && (
                  <p className="posts-error">Failed to load posts</p>
                )}

                {userPosts && (
                  <div className="posts-list">
                    <p className="posts-count">
                      📝 {userPosts.length} posts by this user
                    </p>
                    {userPosts.slice(0, 3).map((post) => (
                      <div key={post.id} className="post-item">
                        <h5>{post.title}</h5>
                        <p>{post.body.substring(0, 100)}...</p>
                      </div>
                    ))}
                    {userPosts.length > 3 && (
                      <p className="more-posts">
                        + {userPosts.length - 3} more posts
                      </p>
                    )}
                  </div>
                )}
              </div>
            )}

            <div className="user-footer">
              <span className="click-hint">
                {selectedUserId === user.id ? '▲ Click to collapse' : '▼ Click to view posts'}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default UsersComponent;
