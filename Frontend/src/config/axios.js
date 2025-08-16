import axios from 'axios';

// Create axios instance with base configuration
// In development, use Vite's proxy by keeping baseURL relative
const api = axios.create({
  baseURL: process.env.NODE_ENV === 'production'
    ? 'https://connectify-8.onrender.com'// Use current domain in production
    : 'http://localhost:5173', // Use Vite dev proxy for /api in development
  withCredentials: true,
  // Do not set Content-Type globally; let axios infer per request (JSON vs FormData)
});

// Request interceptor
api.interceptors.request.use(
  (config) => {
    // You can add auth tokens here if needed
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor
api.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    // Handle common errors here
    if (error.response?.status === 401) {
      // Handle unauthorized
      console.log('Unauthorized access');
    }
    return Promise.reject(error);
  }
);

export default api; 