import useTokenStore from '../store/useTokenStore';
import { refreshToken } from './auth';
import axiosInstance from './axiosInstance';

axiosInstance.interceptors.request.use(async config => {
  await refreshToken();
  const token = useTokenStore.getState().accessToken;
  if (token) {
    config.headers['Authorization'] = `Bearer ${token}`;
  }
  return config;
});
