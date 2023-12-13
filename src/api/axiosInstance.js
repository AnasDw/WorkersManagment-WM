import axios from 'axios';

const baseURL =
  process.env.REACT_APP_ENV === 'development'
    ? process.env.REACT_APP_AxiosClientBaseURL
    : process.env.VITE_BASE_URL_PRODUCTION;

const axiosClient = axios.create({ baseURL });

// Add a response interceptor that handles errors
axiosClient.interceptors.response.use(
  // Return the response data
  (response) => response,
  // Handle errors
  (error) => {
    // Check if there is a response
    if (!error.response) {
      // There was a network error
      console.error('Network error: Please check your internet connection.');
      // Return the error
      return Promise.reject(error);
    }

    // Get the status code from the response
    const statusCode = error.response.status;

    // Based on the status code, handle the error
    switch (statusCode) {
      case 400:
        console.error('Bad Request: The request was unacceptable.');
        break;
      case 401:
        console.error('Unauthorized: Access is denied due to invalid credentials.');
        break;
      case 403:
        console.error('Forbidden: You do not have the necessary permissions.');
        break;
      case 404:
        console.error('Not Found: The requested resource does not exist.');
        break;
      case 500:
        console.error('Internal Server Error: Something went wrong on the server.');
        break;
      default:
        console.error(`An error occurred: ${statusCode} - ${error.response.statusText}`);
    }

    // Return the error
    return Promise.reject(error);
  }
);

// Set the authorization token in the headers
export const setAuthToken = (token) => {
  if (token) {
    axiosClient.defaults.headers.common.Authorization = `Bearer ${token}`;
  } else {
    delete axiosClient.defaults.headers.common.Authorization;
  }
};

// Auth API endpoints
export const authAPI = {
  // Register a new user
  register: (userData) => axiosClient.post('/auth/register', userData),
  // Login a user
  login: (email, password) => axiosClient.post('/auth/login', { email, password }),
  // Logout a user
  logout: () => axiosClient.get('/auth/logout'),
  // Get the current user
  getCurrentUser: () => axiosClient.get('/auth/current-user'),
};

// All requests will wait 2 seconds before timeout
axiosClient.defaults.timeout = 2000;

axiosClient.defaults.withCredentials = true;

export default axiosClient;
