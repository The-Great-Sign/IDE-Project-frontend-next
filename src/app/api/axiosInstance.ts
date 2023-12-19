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
  `Bearer eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ0ZXN0MUBnb29nbGUuY29tIiwicm9sZSI6IlJPTEVfVVNFUiIsImV4cCI6MTcwNDAyNTAyMX0.BCX-iztywjozVUx3Mkz2Oip0NUIo8SScModeV1Bq6Uo`;

export default axiosInstance;
