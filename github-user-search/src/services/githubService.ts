import axios from 'axios';

const GITHUB_API_BASE_URL = 'https://api.github.com';

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
 * Search for GitHub users
 * @param {string} username - The username to search for
 * @returns {Promise} - Promise containing user data
 */
export const searchUser = async (username: string) => {
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
export const searchUsers = async (query: string) => {
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
export const getUserRepositories = async (username: string) => {
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

export default githubApi;
