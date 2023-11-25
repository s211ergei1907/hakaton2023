import axios from 'axios';

export const axiosInstance = axios.create({
  withCredentials: true,
  baseURL: 'http://localhost:8080/'
});

axiosInstance.interceptors.response.use(
  response => response,
  error => {
    if (error.response?.status === 401) {
      window.location.assign(process.env.REACT_APP_BASE_URL + 'auth');
    }
  }
);
