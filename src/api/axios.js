import axios from 'axios';

// Base configuration for accounts API
const accountsApi = axios.create({
  baseURL: 'http://localhost:8000/accounts/',
});

// Base configuration for employee API
const employeeApi = axios.create({
  baseURL: 'http://localhost:8000/employees/',
});


// Common request interceptor for both APIs
const addAuthHeader = (config) => {
  const token = localStorage.getItem('access_token');
  if (token) {
    console.log('Adding token to headers'); // Debug log
    config.headers['Authorization'] = `Bearer ${token}`;
  } else {
    console.warn('No access token found'); // Debug log
  }
  return config;
};

// Common error interceptor for both APIs
const handleUnauthorized = (error) => {
  console.error('API Error:', error); // Add this line
  if (error.response?.status === 401) {
    localStorage.removeItem('access_token');
    localStorage.removeItem('refresh_token');
    window.location.href = '/login';
  }
  return Promise.reject(error);
};

// Add interceptors to both API instances
accountsApi.interceptors.request.use(addAuthHeader);
accountsApi.interceptors.response.use(
  (response) => response,
  handleUnauthorized
);

employeeApi.interceptors.request.use(addAuthHeader);
employeeApi.interceptors.response.use(
  (response) => response,
  handleUnauthorized
);

export { accountsApi, employeeApi };