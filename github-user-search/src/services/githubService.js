import axios from 'axios';

const GITHUB_API_BASE_URL = 'https://api.github.com';
const GITHUB_SEARCH_USERS_URL = 'https://api.github.com/search/users?q';

// Get API key from environment variables (optional)
const API_KEY = import.meta.env.VITE_APP_GITHUB_API_KEY;

// Create axios instance with base configuration
const githubApi = axios.create({
  baseURL: GITHUB_API_BASE_URL,
  headers: {
    'Accept': 'application/vnd.github.v3+json',
    ...(API_KEY && { 'Authorization': `token ${API_KEY}` })
  }
});

/**
 * Fetch user data by username
 * @param {string} username - The username to search for
 * @returns {Promise} - Promise containing user data
 */
export const fetchUserData = async (username) => {
  try {
    const response = await githubApi.get(`/users/${username}`);
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw new Error(error.response?.data?.message || 'Failed to fetch user data');
    }
    throw error;
  }
};

/**
 * Search for GitHub users
 * @param {string} username - The username to search for
 * @returns {Promise} - Promise containing user data
 */
export const searchUser = async (username) => {
  try {
    const response = await githubApi.get(`/users/${username}`);
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw new Error(error.response?.data?.message || 'Failed to fetch user data');
    }
    throw error;
  }
};

/**
 * Search for GitHub users by query
 * @param {string} query - The search query
 * @returns {Promise} - Promise containing search results
 */
export const searchUsers = async (query) => {
  try {
    const response = await githubApi.get(`/search/users?q=${query}`);
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw new Error(error.response?.data?.message || 'Failed to search users');
    }
    throw error;
  }
};

/**
 * Get user repositories
 * @param {string} username - The username
 * @returns {Promise} - Promise containing user repositories
 */
export const getUserRepositories = async (username) => {
  try {
    const response = await githubApi.get(`/users/${username}/repos`);
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw new Error(error.response?.data?.message || 'Failed to fetch repositories');
    }
    throw error;
  }
};

/**
 * Advanced search for GitHub users with multiple criteria
 * @param {Object} criteria - Search criteria object
 * @param {string} criteria.username - Username to search for
 * @param {string} criteria.location - Location filter
 * @param {number} criteria.minRepos - Minimum number of repositories
 * @param {number} criteria.page - Page number for pagination (default: 1)
 * @param {number} criteria.perPage - Results per page (default: 30)
 * @returns {Promise} - Promise containing search results with pagination info
 */
export const advancedSearchUsers = async (criteria) => {
  try {
    // Build the query string based on provided criteria
    const queryParts = [];
    
    if (criteria.username && criteria.username.trim()) {
      queryParts.push(criteria.username.trim());
    }
    
    if (criteria.location && criteria.location.trim()) {
      queryParts.push(`location:${criteria.location.trim()}`);
    }
    
    if (criteria.minRepos && criteria.minRepos > 0) {
      queryParts.push(`repos:>=${criteria.minRepos}`);
    }
    
    // If no query parts, return empty results
    if (queryParts.length === 0) {
      return {
        items: [],
        total_count: 0,
        incomplete_results: false
      };
    }
    
    const query = queryParts.join('+');
    const page = criteria.page || 1;
    const perPage = criteria.perPage || 30;
    
    const response = await githubApi.get(
      `/search/users?q=${encodeURIComponent(query)}&page=${page}&per_page=${perPage}`
    );
    
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw new Error(error.response?.data?.message || 'Failed to search users');
    }
    throw error;
  }
};

export default githubApi;
