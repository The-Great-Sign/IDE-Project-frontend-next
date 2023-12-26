import useTokenStore from '@/store/useTokenStore';
import axios from 'axios';
import { refreshToken } from './auth';

const headers = {
  'Content-Type': 'application/json',
  'Access-Control-Allow-Origin': '*',
};

const axiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_BACKEND_URI,
  headers: headers,
  withCredentials: true,
});

axiosInstance.interceptors.request.use(async config => {
  await refreshToken();
  const token = useTokenStore.getState().accessToken;
  if (token) {
    config.headers['Authorization'] = useTokenStore.getState().accessToken;
  }
  return config;
});

axiosInstance.defaults.headers.common['Authorization'] =
  useTokenStore.getState().accessToken;

export default axiosInstance;
