import axios from 'axios';
import store from '../store';
import { logout } from '../store/slices/authSlice';
import { showToast } from '../store/slices/uiSlice';

// Base URL would point to the backend in production
const API_URL = 'https://api.trustpulse.ai/v1';

const apiClient = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request Interceptor
apiClient.interceptors.request.use(
  (config) => {
    // Add auth token if available
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response Interceptor
apiClient.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    // Handle global errors
    if (error.response) {
      if (error.response.status === 401) {
        // Token expired or invalid
        store.dispatch(logout());
        store.dispatch(
          showToast({ message: 'Session expired. Please log in again.', severity: 'error' })
        );
      } else {
        // Other errors
        const message = error.response.data?.message || 'An unexpected error occurred.';
        store.dispatch(showToast({ message, severity: 'error' }));
      }
    } else if (error.request) {
      // Network error
      store.dispatch(showToast({ message: 'Network error. Please check your connection.', severity: 'error' }));
    }
    
    return Promise.reject(error);
  }
);

// Mock implementation wrapper
export const mockApiCall = async (data, delay = 800, shouldFail = false) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (shouldFail) {
        reject(new Error('Mock API call failed'));
      } else {
        resolve({ data });
      }
    }, delay);
  });
};

export default apiClient;
