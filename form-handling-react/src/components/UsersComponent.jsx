import { useQuery } from '@tanstack/react-query';
import { useState } from 'react';
import './UsersComponent.css';

// Validation helper functions
const isValidEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

const isValidPhone = (phone) => {
  // Basic validation: contains at least some digits
  return phone && /\d/.test(phone);
};

const isValidWebsite = (website) => {
  // Basic validation: contains a dot
  return website && website.includes('.');
};

const validateUser = (user) => {
  const errors = [];
  
  if (!user.name || user.name.trim() === '') {
    errors.push('Name is required');
  }
  
  if (!user.email || !isValidEmail(user.email)) {
    errors.push('Valid email is required');
  }
  
  if (!user.phone || !isValidPhone(user.phone)) {
    errors.push('Valid phone is required');
  }
  
  if (!user.website || !isValidWebsite(user.website)) {
    errors.push('Valid website is required');
  }
  
  if (!user.company || !user.company.name) {
    errors.push('Company name is required');
  }
  
  return {
    isValid: errors.length === 0,
    errors
  };
};

const validatePost = (post) => {
  const errors = [];
  
  if (!post.title || post.title.trim() === '') {
    errors.push('Post title is required');
  }
  
  if (!post.body || post.body.trim() === '') {
    errors.push('Post body is required');
  }
  
  if (post.title && post.title.length < 5) {
    errors.push('Post title must be at least 5 characters');
  }
  
  if (post.body && post.body.length < 10) {
    errors.push('Post body must be at least 10 characters');
  }
  
  return {
    isValid: errors.length === 0,
    errors
  };
};

// Function to fetch users from JSONPlaceholder API
const fetchUsers = async () => {
  const response = await fetch('https://jsonplaceholder.typicode.com/users');
  
  if (!response.ok) {
    throw new Error('Failed to fetch users');
  }
  
  const data = await response.json();
  
  // Validate fetched users
  const validatedUsers = data.map(user => {
    const validation = validateUser(user);
    return {
      ...user,
      validation
    };
  });
  
  return validatedUsers;
};

// Function to fetch user's posts
const fetchUserPosts = async (userId) => {
  // Validate userId
  if (!userId || userId <= 0) {
    throw new Error('Invalid user ID');
  }
  
  const response = await fetch(`https://jsonplaceholder.typicode.com/posts?userId=${userId}`);
  
  if (!response.ok) {
    throw new Error('Failed to fetch user posts');
  }
  
  const data = await response.json();
  
  // Validate fetched posts
  const validatedPosts = data.map(post => {
    const validation = validatePost(post);
    return {
      ...post,
      validation
    };
  });
  
  return validatedPosts;
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
        {users && (
          <p className="validation-summary">
            ✅ Valid Users: <strong>{users.filter(u => u.validation?.isValid).length}</strong>
            {users.some(u => !u.validation?.isValid) && (
              <span className="validation-warning"> ⚠️ Some users have validation warnings</span>
            )}
          </p>
        )}
      </div>

      <div className="users-grid">
        {users?.map((user) => (
          <div 
            key={user.id} 
            className={`user-card ${selectedUserId === user.id ? 'selected' : ''} ${!user.validation?.isValid ? 'has-warnings' : ''}`}
            onClick={() => handleUserClick(user.id)}
          >
            {!user.validation?.isValid && (
              <div className="validation-badge">⚠️ Validation Issues</div>
            )}
            
            <div className="user-header">
              <div className="user-avatar">{user.name.charAt(0)}</div>
              <div className="user-basic">
                <h3 className="user-name">{user.name}</h3>
                <p className="user-username">@{user.username}</p>
              </div>
            </div>
            
            {!user.validation?.isValid && user.validation?.errors && (
              <div className="validation-errors">
                <strong>Validation Issues:</strong>
                <ul>
                  {user.validation.errors.map((error, index) => (
                    <li key={index}>{error}</li>
                  ))}
                </ul>
              </div>
            )}

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
                      {userPosts.some(p => !p.validation?.isValid) && (
                        <span className="validation-warning-inline"> ⚠️ {userPosts.filter(p => !p.validation?.isValid).length} with issues</span>
                      )}
                    </p>
                    {userPosts.slice(0, 3).map((post) => (
                      <div key={post.id} className={`post-item ${!post.validation?.isValid ? 'post-invalid' : ''}`}>
                        <h5>
                          {post.title}
                          {!post.validation?.isValid && <span className="warning-icon"> ⚠️</span>}
                        </h5>
                        <p>{post.body.substring(0, 100)}...</p>
                        {!post.validation?.isValid && post.validation?.errors && (
                          <div className="post-validation-errors">
                            {post.validation.errors.map((error, idx) => (
                              <span key={idx} className="error-tag">{error}</span>
                            ))}
                          </div>
                        )}
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
