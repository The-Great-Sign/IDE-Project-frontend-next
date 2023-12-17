import useTokenStore from '@/store/useTokenStore';
import axiosInstance from './axiosInstance';

function isTokenExpired() {
  const tokenExpiryTime = useTokenStore.getState().tokenExpiryTime;
  if (!tokenExpiryTime) return true;

  const now = new Date();
  const expiryTime = new Date(tokenExpiryTime).getTime();
  return now.getTime() > expiryTime - 5 * 60 * 1000;
}

export async function refreshToken() {
  if (isTokenExpired()) {
    try {
      const response = await axiosInstance.get('/refresh-token');
      const newAccessToken = response.data.accessToken;
      const newExpiryTime = response.data.expiryTime;

      useTokenStore.getState().setAccessToken(newAccessToken, newExpiryTime);
    } catch (error) {
      console.error('Token refresh failed', error);
    }
  }
}
