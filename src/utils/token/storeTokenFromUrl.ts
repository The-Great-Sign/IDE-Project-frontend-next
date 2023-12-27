import { fetchUserInfo } from '@/app/api/user/fetchUserInfo';
import useTokenStore from '@/store/useTokenStore';
import { setCookie } from './cookieUtils';

export const firstTokenStore = (
  accessTokenFromURL: string,
  refreshTokenFromURL: string
) => {
  // URL에서 토큰을 가져와 상태와 로컬 스토리지에 저장
  useTokenStore.getState().setAccessToken(accessTokenFromURL);
  localStorage.setItem('accessToken', accessTokenFromURL);
  setCookie('refreshToken', refreshTokenFromURL, 1);

  useTokenStore.getState().setLogin(true);
  fetchUserInfo();

  if (typeof window !== 'undefined') {
    window.history.pushState({}, '', '/');
  }
};
