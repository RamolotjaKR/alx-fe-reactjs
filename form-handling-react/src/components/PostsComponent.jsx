import { useQuery } from '@tanstack/react-query';
import './PostsComponent.css';

// Function to fetch posts from JSONPlaceholder API
const fetchPosts = async () => {
  const response = await fetch('https://jsonplaceholder.typicode.com/posts');
  
  if (!response.ok) {
    throw new Error('Network response was not ok');
  }
  
  return response.json();
};

const PostsComponent = () => {
  // Using useQuery hook to fetch and manage data
  const { 
    data: posts, 
    isLoading, 
    isError, 
    error, 
    refetch,
    isFetching 
  } = useQuery({
    queryKey: ['posts'],
    queryFn: fetchPosts,
    staleTime: 5000, // Data is fresh for 5 seconds
    cacheTime: 10 * 60 * 1000, // Cache data for 10 minutes
  });

  // Loading state
  if (isLoading) {
    return (
      <div className="posts-container">
        <div className="loading">
          <div className="spinner"></div>
          <p>Loading posts...</p>
        </div>
      </div>
    );
  }

  // Error state
  if (isError) {
    return (
      <div className="posts-container">
        <div className="error-box">
          <h3>Error fetching posts</h3>
          <p>{error.message}</p>
          <button onClick={() => refetch()} className="refetch-btn">
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="posts-container">
      <div className="posts-header">
        <h2>Posts from JSONPlaceholder API</h2>
        <div className="header-actions">
          <button 
            onClick={() => refetch()} 
            className="refetch-btn"
            disabled={isFetching}
          >
            {isFetching ? 'Refreshing...' : 'Refetch Data'}
          </button>
          {isFetching && <span className="fetching-indicator">🔄 Fetching...</span>}
        </div>
      </div>

      <div className="posts-info">
        <p>
          📦 Total Posts: <strong>{posts?.length || 0}</strong>
        </p>
        <p className="cache-note">
          💡 <strong>Cache Demo:</strong> Navigate away and come back to see cached data load instantly!
        </p>
      </div>

      <div className="posts-grid">
        {posts?.slice(0, 20).map((post) => (
          <div key={post.id} className="post-card">
            <div className="post-id">#{post.id}</div>
            <h3 className="post-title">{post.title}</h3>
            <p className="post-body">{post.body}</p>
            <div className="post-footer">
              <span className="user-badge">User {post.userId}</span>
            </div>
          </div>
        ))}
      </div>

      {posts?.length > 20 && (
        <div className="posts-footer">
          <p>Showing 20 of {posts.length} posts</p>
        </div>
      )}
    </div>
  );
};

export default PostsComponent;
