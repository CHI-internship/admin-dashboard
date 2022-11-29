import axios from 'axios';

const token = localStorage.getItem('token');

export const axiosInstance = axios.create({
  baseURL: process.env.REACT_APP_BASE_SERVICE_URL,
  headers: { Authorization: `Bearer ${token}` },
});