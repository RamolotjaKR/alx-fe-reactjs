import './Home.css';

const Home = () => {
  return (
    <div className="page-container">
      <h1>Welcome to React Router Advanced</h1>
      <p>
        This application demonstrates advanced routing techniques including:
      </p>
      <ul>
        <li>Nested Routes - See the Profile section for sub-routes</li>
        <li>Dynamic Routes - Blog posts with variable URLs</li>
        <li>Protected Routes - Login required to access Profile</li>
      </ul>
      <div className="feature-cards">
        <div className="card">
          <h3>🔒 Protected Routes</h3>
          <p>
            Certain pages require authentication. Try accessing the Profile
            page without logging in!
          </p>
        </div>
        <div className="card">
          <h3>🗂️ Nested Routes</h3>
          <p>
            The Profile section contains nested routes for Details and
            Settings.
          </p>
        </div>
        <div className="card">
          <h3>🔗 Dynamic Routes</h3>
          <p>Blog posts use dynamic routing with URL parameters.</p>
        </div>
      </div>
    </div>
  );
};

export default Home;
