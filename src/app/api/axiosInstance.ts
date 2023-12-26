import useTokenStore from '@/store/useTokenStore';
import axios from 'axios';

const headers = {
  'Content-Type': 'application/json',
  'Access-Control-Allow-Origin': '*',
};

const axiosInstance = axios.create({
  baseURL: `${process.env.NEXT_PUBLIC_BACKEND_URI}`,
  headers: headers,
  withCredentials: true,
});

axiosInstance.defaults.headers.common['Authorization'] =
  useTokenStore.getState().accessToken;

export default axiosInstance;
