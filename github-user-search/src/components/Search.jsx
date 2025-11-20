import { useState } from 'react';
import { advancedSearchUsers } from '../services/githubService';

function Search() {
  const [username, setUsername] = useState('');
  const [location, setLocation] = useState('');
  const [minRepos, setMinRepos] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalCount, setTotalCount] = useState(0);
  const [hasSearched, setHasSearched] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    performSearch(1);
  };

  const performSearch = async (page) => {
    if (!username.trim() && !location.trim() && !minRepos) {
      return;
    }

    setLoading(true);
    setError(false);
    setHasSearched(true);

    try {
      const criteria = {
        username: username,
        location: location,
        minRepos: minRepos ? parseInt(minRepos) : null,
        page: page,
        perPage: 10
      };

      const data = await advancedSearchUsers(criteria);
      
      if (page === 1) {
        setSearchResults(data.items);
      } else {
        setSearchResults(prev => [...prev, ...data.items]);
      }
      
      setTotalCount(data.total_count);
      setCurrentPage(page);
    } catch (err) {
      setError(true);
      setSearchResults([]);
    } finally {
      setLoading(false);
    }
  };

  const handleLoadMore = () => {
    performSearch(currentPage + 1);
  };

  const hasMoreResults = searchResults.length < totalCount;

  return (
    <div className="w-full max-w-6xl mx-auto px-4">
      {/* Advanced Search Form */}
      <form onSubmit={handleSubmit} className="mb-8">
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-xl font-semibold mb-4 text-gray-800">Advanced Search</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
            <div>
              <label htmlFor="username" className="block text-sm font-medium text-gray-700 mb-2">
                Username
              </label>
              <input
                id="username"
                type="text"
                placeholder="e.g., octocat"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition"
              />
            </div>

            <div>
              <label htmlFor="location" className="block text-sm font-medium text-gray-700 mb-2">
                Location
              </label>
              <input
                id="location"
                type="text"
                placeholder="e.g., San Francisco"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition"
              />
            </div>

            <div>
              <label htmlFor="minRepos" className="block text-sm font-medium text-gray-700 mb-2">
                Minimum Repositories
              </label>
              <input
                id="minRepos"
                type="number"
                placeholder="e.g., 10"
                min="0"
                value={minRepos}
                onChange={(e) => setMinRepos(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition"
              />
            </div>
          </div>

          <button
            type="submit"
            className="w-full md:w-auto px-8 py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition duration-200 shadow-md hover:shadow-lg"
          >
            Search Users
          </button>
        </div>
      </form>

      {/* Results Section */}
      <div className="results-section">
        {loading && currentPage === 1 && (
          <div className="text-center py-12">
            <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
            <p className="mt-4 text-lg text-gray-600">Loading...</p>
          </div>
        )}

        {error && (
          <div className="bg-red-50 border border-red-200 rounded-lg p-6 text-center">
            <p className="text-red-600 text-lg font-medium">Looks like we cant find the user</p>
          </div>
        )}

        {hasSearched && !loading && !error && searchResults.length === 0 && (
          <div className="bg-gray-50 border border-gray-200 rounded-lg p-6 text-center">
            <p className="text-gray-600 text-lg">No users found matching your criteria.</p>
          </div>
        )}

        {searchResults.length > 0 && (
          <div>
            <div className="mb-4 text-gray-600">
              Found {totalCount.toLocaleString()} users
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {searchResults.map((user) => (
                <div
                  key={user.id}
                  className="bg-white rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300 p-6"
                >
                  <div className="flex items-start gap-4">
                    <img
                      src={user.avatar_url}
                      alt={user.login}
                      className="w-20 h-20 rounded-full border-2 border-gray-200"
                    />
                    <div className="flex-1 min-w-0">
                      <h3 className="text-xl font-bold text-gray-900 truncate">
                        {user.login}
                      </h3>
                      <p className="text-sm text-gray-500 mb-2">
                        ID: {user.id}
                      </p>
                      
                      <div className="flex flex-wrap gap-2 mt-3">
                        <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                          Score: {user.score?.toFixed(1)}
                        </span>
                        {user.type && (
                          <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">
                            {user.type}
                          </span>
                        )}
                      </div>

                      <a
                        href={user.html_url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-block mt-4 px-4 py-2 bg-gray-900 text-white text-sm font-medium rounded-lg hover:bg-gray-800 transition duration-200"
                      >
                        View Profile
                      </a>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {hasMoreResults && (
              <div className="text-center mt-8">
                <button
                  onClick={handleLoadMore}
                  disabled={loading}
                  className="px-8 py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition duration-200 shadow-md hover:shadow-lg"
                >
                  {loading ? 'Loading...' : 'Load More'}
                </button>
                <p className="mt-2 text-sm text-gray-600">
                  Showing {searchResults.length} of {totalCount.toLocaleString()} results
                </p>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

export default Search;
