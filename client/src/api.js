import axios from 'axios';

// Uses Render URL in production, localhost in development
const baseURL = window.location.hostname === 'localhost'
  ? 'http://localhost:5000/api'
  : 'https://primevideo-mern.onrender.com/api';

const API = axios.create({ baseURL });

// Attach token to every request
API.interceptors.request.use((req) => {
  const token = localStorage.getItem('token');
  if (token) req.headers.Authorization = `Bearer ${token}`;
  return req;
});

export default API;
