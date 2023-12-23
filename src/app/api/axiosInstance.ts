import useTokenStore from '@/store/useTokenStore';
import axios from 'axios';

const headers = {
  'Content-Type': 'application/json',
  'Access-Control-Allow-Origin': '*',
};

const axiosInstance = axios.create({
  baseURL: 'http://ec2-43-203-40-200.ap-northeast-2.compute.amazonaws.com:8080',
  headers: headers,
  withCredentials: true,
});

axiosInstance.defaults.headers.common['Authorization'] =
  useTokenStore.getState().accessToken;
export default axiosInstance;
