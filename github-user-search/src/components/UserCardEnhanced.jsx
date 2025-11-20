import { useState, useEffect } from 'react';
import { fetchUserData } from '../services/githubService';

function UserCard({ user }) {
  const [detailedData, setDetailedData] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchDetails = async () => {
      setLoading(true);
      try {
        const data = await fetchUserData(user.login);
        setDetailedData(data);
      } catch (error) {
        // Error handled silently in production
      } finally {
        setLoading(false);
      }
    };

    if (user.login) {
      fetchDetails();
    }
  }, [user.login]);

  const displayData = detailedData || user;

  return (
    <div className="bg-white rounded-lg shadow-md hover:shadow-xl transition-all duration-300 p-6 border border-gray-100">
      <div className="flex items-start gap-4">
        <img
          src={displayData.avatar_url}
          alt={displayData.login}
          className="w-24 h-24 rounded-full border-4 border-blue-100 shadow-md"
        />
        <div className="flex-1 min-w-0">
          <h3 className="text-2xl font-bold text-gray-900 truncate">
            {displayData.name || displayData.login}
          </h3>
          <p className="text-sm text-gray-500 mb-1">@{displayData.login}</p>
          
          {displayData.bio && (
            <p className="text-sm text-gray-700 mt-2 mb-3 line-clamp-2">
              {displayData.bio}
            </p>
          )}

          {/* User Stats */}
          <div className="grid grid-cols-3 gap-3 my-4">
            {displayData.public_repos !== undefined && (
              <div className="text-center bg-blue-50 rounded-lg p-2">
                <div className="text-lg font-bold text-blue-700">
                  {displayData.public_repos}
                </div>
                <div className="text-xs text-gray-600">Repos</div>
              </div>
            )}
            {displayData.followers !== undefined && (
              <div className="text-center bg-green-50 rounded-lg p-2">
                <div className="text-lg font-bold text-green-700">
                  {displayData.followers}
                </div>
                <div className="text-xs text-gray-600">Followers</div>
              </div>
            )}
            {displayData.following !== undefined && (
              <div className="text-center bg-purple-50 rounded-lg p-2">
                <div className="text-lg font-bold text-purple-700">
                  {displayData.following}
                </div>
                <div className="text-xs text-gray-600">Following</div>
              </div>
            )}
          </div>

          {/* Additional Info */}
          <div className="space-y-2 mb-4">
            {displayData.location && (
              <div className="flex items-center text-sm text-gray-600">
                <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                </svg>
                {displayData.location}
              </div>
            )}
            {displayData.company && (
              <div className="flex items-center text-sm text-gray-600">
                <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M4 4a2 2 0 012-2h8a2 2 0 012 2v12a1 1 0 110 2h-3a1 1 0 01-1-1v-2a1 1 0 00-1-1H9a1 1 0 00-1 1v2a1 1 0 01-1 1H4a1 1 0 110-2V4zm3 1h2v2H7V5zm2 4H7v2h2V9zm2-4h2v2h-2V5zm2 4h-2v2h2V9z" clipRule="evenodd" />
                </svg>
                {displayData.company}
              </div>
            )}
            {displayData.blog && (
              <div className="flex items-center text-sm text-gray-600 truncate">
                <svg className="w-4 h-4 mr-2 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M12.586 4.586a2 2 0 112.828 2.828l-3 3a2 2 0 01-2.828 0 1 1 0 00-1.414 1.414 4 4 0 005.656 0l3-3a4 4 0 00-5.656-5.656l-1.5 1.5a1 1 0 101.414 1.414l1.5-1.5zm-5 5a2 2 0 012.828 0 1 1 0 101.414-1.414 4 4 0 00-5.656 0l-3 3a4 4 0 105.656 5.656l1.5-1.5a1 1 0 10-1.414-1.414l-1.5 1.5a2 2 0 11-2.828-2.828l3-3z" />
                </svg>
                <a href={displayData.blog.startsWith('http') ? displayData.blog : `https://${displayData.blog}`} 
                   target="_blank" 
                   rel="noopener noreferrer"
                   className="text-blue-600 hover:underline truncate">
                  {displayData.blog}
                </a>
              </div>
            )}
          </div>

          <a
            href={displayData.html_url}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block px-5 py-2 bg-gray-900 text-white text-sm font-semibold rounded-lg hover:bg-gray-800 transition duration-200 shadow-md hover:shadow-lg"
          >
            View GitHub Profile →
          </a>
        </div>
      </div>
      
      {loading && (
        <div className="absolute inset-0 bg-white bg-opacity-75 flex items-center justify-center rounded-lg">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
        </div>
      )}
    </div>
  );
}

export default UserCard;
