import axios from 'axios';

const axiosClient = axios.create();

axiosClient.defaults.baseURL = process.env.REACT_APP_AxiosClientBaseURL;

axiosClient.headers = {
  'Content-Type': 'application/json',
  Accept: 'application/json',
};

// All requests will wait 2 seconds before timeout
axiosClient.defaults.timeout = 2000;

axiosClient.defaults.withCredentials = true;

axiosClient.defaults.auth = { Authorization: `Bearer ${document.cookie.split('=')[1]}` };

export default axiosClient;
