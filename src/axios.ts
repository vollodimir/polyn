import axios from 'axios';

const instance = axios.create({
  baseURL: 'http://localhost:4444/',
});

//axios setings

instance.interceptors.request.use((config) => {
  const token = window.localStorage.getItem('token');
  token && config.headers && (config.headers.Authorization = token);
  return config;
});

export default instance;
