import { Link } from 'react-router-dom';
import './Blog.css';

// Mock blog posts data
const blogPosts = [
  {
    id: 1,
    title: 'Getting Started with React Router',
    excerpt: 'Learn the basics of React Router and how to set up routing in your React application.',
    author: 'John Doe',
    date: '2025-12-01'
  },
  {
    id: 2,
    title: 'Advanced Routing Patterns',
    excerpt: 'Explore advanced routing patterns including nested routes, protected routes, and dynamic routing.',
    author: 'Jane Smith',
    date: '2025-12-05'
  },
  {
    id: 3,
    title: 'Authentication in React',
    excerpt: 'Implement a robust authentication system in your React application using context and protected routes.',
    author: 'Mike Johnson',
    date: '2025-12-08'
  },
  {
    id: 4,
    title: 'React Performance Optimization',
    excerpt: 'Tips and tricks for optimizing your React application for better performance.',
    author: 'Sarah Williams',
    date: '2025-12-10'
  }
];

const Blog = () => {
  return (
    <div className="page-container">
      <h1>Blog Posts</h1>
      <p>Click on any post to view its full content (dynamic routing)</p>
      <div className="blog-grid">
        {blogPosts.map((post) => (
          <Link to={`/blog/${post.id}`} key={post.id} className="blog-card">
            <h2>{post.title}</h2>
            <p className="blog-excerpt">{post.excerpt}</p>
            <div className="blog-meta">
              <span className="author">By {post.author}</span>
              <span className="date">{post.date}</span>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Blog;
