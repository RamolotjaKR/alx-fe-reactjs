import './About.css';

const About = () => {
  return (
    <div className="page-container">
      <h1>About This Project</h1>
      <p>
        This project demonstrates advanced routing techniques in React using
        React Router v6.
      </p>
      <h2>Technologies Used</h2>
      <ul>
        <li>React 18</li>
        <li>React Router v6</li>
        <li>Vite</li>
      </ul>
      <h2>Key Features</h2>
      <div className="feature-list">
        <div className="feature-item">
          <h3>Authentication System</h3>
          <p>
            A simple context-based authentication system that manages user
            login state throughout the application.
          </p>
        </div>
        <div className="feature-item">
          <h3>Route Protection</h3>
          <p>
            Protected routes that redirect unauthenticated users to the login
            page.
          </p>
        </div>
        <div className="feature-item">
          <h3>Nested Routing</h3>
          <p>
            Hierarchical route structures that allow for complex page layouts
            and navigation patterns.
          </p>
        </div>
        <div className="feature-item">
          <h3>Dynamic Routing</h3>
          <p>
            URL parameters that enable dynamic content loading based on the
            route path.
          </p>
        </div>
      </div>
    </div>
  );
};

export default About;
