import { useParams, useNavigate } from 'react-router-dom';
import './BlogPost.css';

// Mock blog posts data (same as in Blog.jsx)
const blogPosts = [
  {
    id: 1,
    title: 'Getting Started with React Router',
    excerpt: 'Learn the basics of React Router and how to set up routing in your React application.',
    content: `React Router is a powerful library for handling routing in React applications. It allows you to create single-page applications with navigation without page refreshes.
    
    In this guide, we'll cover the basics of setting up React Router in your project. First, install it using npm install react-router-dom. Then, wrap your application with BrowserRouter and define your routes using the Route component.
    
    Key concepts include:
    - BrowserRouter: The wrapper component that provides routing context
    - Routes: Container for all your route definitions
    - Route: Defines a single route with a path and component
    - Link: Navigation component for creating links without page reloads
    
    React Router v6 introduced significant improvements over previous versions, including a more declarative API and better TypeScript support.`,
    author: 'John Doe',
    date: '2025-12-01'
  },
  {
    id: 2,
    title: 'Advanced Routing Patterns',
    excerpt: 'Explore advanced routing patterns including nested routes, protected routes, and dynamic routing.',
    content: `Once you've mastered the basics of React Router, it's time to explore advanced patterns that will make your applications more robust and secure.
    
    Nested Routes allow you to create hierarchical route structures. This is perfect for layouts with multiple levels of navigation, such as a dashboard with sub-sections.
    
    Protected Routes are essential for applications with authentication. They ensure that certain pages can only be accessed by authenticated users, redirecting others to a login page.
    
    Dynamic Routing uses URL parameters to load content dynamically. For example, /blog/:id can load different blog posts based on the ID in the URL.
    
    These patterns combined create powerful, flexible routing systems that can handle complex application requirements.`,
    author: 'Jane Smith',
    date: '2025-12-05'
  },
  {
    id: 3,
    title: 'Authentication in React',
    excerpt: 'Implement a robust authentication system in your React application using context and protected routes.',
    content: `Building a secure authentication system in React requires careful planning and implementation. The Context API provides an excellent foundation for managing authentication state across your application.
    
    Start by creating an AuthContext that stores user information and authentication status. This context should provide login and logout functions, as well as methods to check if a user is authenticated.
    
    Protected routes work in conjunction with your auth context. They check authentication status and redirect unauthenticated users to a login page. This ensures that sensitive parts of your application remain secure.
    
    Remember to handle token storage securely (consider httpOnly cookies), implement proper error handling, and always validate authentication on the server side as well.
    
    Additional considerations include refresh token rotation, session timeout handling, and proper logout procedures that clear all sensitive data.`,
    author: 'Mike Johnson',
    date: '2025-12-08'
  },
  {
    id: 4,
    title: 'React Performance Optimization',
    excerpt: 'Tips and tricks for optimizing your React application for better performance.',
    content: `Performance is crucial for delivering great user experiences. React provides several tools and techniques to optimize your applications.
    
    Key optimization strategies include:
    
    1. Code Splitting: Use React.lazy() and Suspense to split your code into smaller chunks that load on demand.
    
    2. Memoization: Use React.memo() for components and useMemo() for expensive calculations to prevent unnecessary re-renders.
    
    3. Virtual Scrolling: For long lists, implement virtual scrolling to render only visible items.
    
    4. Image Optimization: Lazy load images and use appropriate formats (WebP, AVIF) for better performance.
    
    5. Bundle Analysis: Regularly analyze your bundle size and remove unused dependencies.
    
    Remember, premature optimization is the root of all evil. Profile first, then optimize based on actual bottlenecks.`,
    author: 'Sarah Williams',
    date: '2025-12-10'
  }
];

const BlogPost = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  
  // Find the post by ID
  const post = blogPosts.find(p => p.id === parseInt(id));

  if (!post) {
    return (
      <div className="page-container">
        <div className="post-not-found">
          <h1>Post Not Found</h1>
          <p>The blog post you're looking for doesn't exist.</p>
          <button onClick={() => navigate('/blog')} className="back-button">
            Back to Blog
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="page-container">
      <button onClick={() => navigate('/blog')} className="back-button">
        ← Back to Blog
      </button>
      <article className="blog-post">
        <header className="post-header">
          <h1>{post.title}</h1>
          <div className="post-meta">
            <span className="author">By {post.author}</span>
            <span className="date">{post.date}</span>
          </div>
        </header>
        <div className="post-content">
          {post.content.split('\n').map((paragraph, index) => (
            paragraph.trim() && <p key={index}>{paragraph.trim()}</p>
          ))}
        </div>
      </article>
    </div>
  );
};

export default BlogPost;
