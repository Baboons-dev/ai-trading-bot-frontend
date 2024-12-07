import axios, { AxiosInstance } from 'axios';
import { useAuthStore } from '@/lib/store/use-store';

const TIMEOUT = 15 * 100000;
const SERVER_URL =
  process.env.NEXT_PUBLIC_API_HOST || 'https://api.cspr.baboons.tech/';
// const SERVER_URL = process.env.NEXT_PUBLIC_API_HOST || 'http://127.0.0.1:8000/';
const API_KEY =
  process.env.NEXT_PUBLIC_API_KEY ||
  '9KVvI9QM_98vtE__EYrhCgxFad-6do8fRB9050923uc';

const instance: AxiosInstance = axios.create({
  baseURL: SERVER_URL,
  timeout: TIMEOUT,
  headers: {
    'Content-Type': 'application/json',
    'X-API-Key': API_KEY,
  },
});

instance.interceptors.request.use(
  async (config) => {
    if (typeof window !== 'undefined') {
      const token = localStorage.getItem('token');
      if (token && config?.headers) {
        config.headers['Authorization'] = `Bearer ${token}`;
      }
    }
    return config;
  },
  (error) => Promise.reject(error),
);

instance.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      useAuthStore.getState().logout();
      return Promise.reject(error);
    }

    return Promise.reject(error);
  },
);

export default instance;
