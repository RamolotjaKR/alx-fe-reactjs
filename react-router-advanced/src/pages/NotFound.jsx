import { useNavigate } from 'react-router-dom';
import './NotFound.css';

const NotFound = () => {
  const navigate = useNavigate();

  return (
    <div className="page-container">
      <div className="not-found-container">
        <h1 className="not-found-title">404</h1>
        <h2>Page Not Found</h2>
        <p>The page you're looking for doesn't exist or has been moved.</p>
        <div className="not-found-actions">
          <button onClick={() => navigate('/')} className="primary-button">
            Go Home
          </button>
          <button onClick={() => navigate(-1)} className="secondary-button">
            Go Back
          </button>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
