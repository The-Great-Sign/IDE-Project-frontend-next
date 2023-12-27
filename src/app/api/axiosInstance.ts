import useTokenStore from '@/store/useTokenStore';
import axios from 'axios';
import {
  isTokenBeingRefreshed,
  isTokenExpired,
  refreshToken,
} from './token/fetchRefreshToken';

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
  if (!isTokenBeingRefreshed() && isTokenExpired()) {
    await refreshToken();
  }
  const token = useTokenStore.getState().accessToken;

  if (token) {
    config.headers['Authorization'] = useTokenStore.getState().accessToken;
  }
  return config;
});

// axiosInstance.defaults.headers.common['Authorization'] =
//   useTokenStore.getState().accessToken;

export default axiosInstance;
