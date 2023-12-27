import useTokenStore from '@/store/useTokenStore';
import { getCookie, setCookie } from '@/utils/token/cookieUtils';
import axios from 'axios';

//토큰 만료 확인 함수
export function isTokenExpired() {
  const tokenExpiryTime = useTokenStore.getState().tokenExpiryTime;
  if (!tokenExpiryTime) return true;

  const now = new Date();
  const expiryTime = new Date(tokenExpiryTime).getTime();
  console.log(expiryTime);
  return now.getTime() > expiryTime - 300000;
}

//토큰이 리프레싱 되고 있는 중인지 확인하는 함수
let refreshingToken = false;
export function isTokenBeingRefreshed() {
  return refreshingToken;
}

//토큰 리프레시 하는 함수
export async function refreshToken() {
  if (!refreshingToken) {
    refreshingToken = true;

    try {
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_BACKEND_URI}/refresh-token`,
        {},
        {
          headers: {
            'Authorization-refresh': getCookie('refreshToken'),
          },
        }
      );

      const newAccessToken = response.data.results.accessToken;
      const newRefreshToken = response.data.results.refreshToken;

      if (newAccessToken) {
        useTokenStore.getState().setAccessToken(newAccessToken);
        localStorage.setItem('accessToken', newAccessToken);
        setCookie('refreshToken', newRefreshToken, 1);
      }
    } catch (error) {
      console.error('Token refresh failed', error);
    } finally {
      refreshingToken = false;
    }
  }
}
