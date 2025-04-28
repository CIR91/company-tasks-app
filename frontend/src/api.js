// web/frontend/src/api.js
import axios from 'axios';

export const API = axios.create({
  baseURL: '/api',
  headers: { 'Content-Type': 'application/json' }
});

// Inyectar el token en cada request
API.interceptors.request.use(config => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Manejar globalmente respuestas 401
API.interceptors.response.use(
  response => response,
  error => {
    if (error.response?.status === 401) {
      localStorage.removeItem('token');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

export const register            = data => API.post('/auth/register', data);
export const login               = data => API.post('/auth/login',    data);
export const fetchTasks          = ()   => API.get('/tasks');
export const createTask          = d    => API.post('/tasks', d);
export const updateTask          = (id,d)=> API.put(`/tasks/${id}`, d);
export const deleteTask          = id   => API.delete(`/tasks/${id}`);
export const fetchUsers          = ()   => API.get('/users');
export const fetchCompany        = ()   => API.get('/company');
export const uploadLogo          = fd   => API.post('/company/logo', fd, {
  headers: { 'Content-Type': 'multipart/form-data' }
});
export const fetchReportSummary  = ()   => API.get('/reports/summary');
