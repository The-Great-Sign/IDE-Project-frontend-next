'use client';

import React, { useEffect } from 'react';
import { ThemeProvider } from 'styled-components';
import GlobalStyles from '@/styles/globalStyles';
import useThemeStore from '@/store/useThemeStore';
import ThemeToggleBtn from '@/components/ThemeToggleBtn/ThemeToggleBtn';
import { useSearchParams } from 'next/navigation';
import useTokenStore from '@/store/useTokenStore';
import useUserStore from '@/store/useUserStore';
import axiosInstance from './api/axiosInstance';

const RootLayout = ({ children }: { children: React.ReactNode }) => {
  const theme = useThemeStore(state => state.theme);
  const params = useSearchParams();

  useEffect(() => {
    const accessTokenFromURL = params.get('token');
    const refreshTokenFromURL = params.get('refresh_token');
    const storedAccessToken = localStorage.getItem('accessToken');

    if (accessTokenFromURL && refreshTokenFromURL) {
      // URL에서 토큰을 가져와 상태와 로컬 스토리지에 저장
      useTokenStore.getState().setAccessToken(accessTokenFromURL);
      localStorage.setItem('accessToken', accessTokenFromURL);
      document.cookie = `refreshToken=${refreshTokenFromURL}; path=/;`;
      useUserStore.getState().setLogin(true);
      fetchUserInfo();

      if (typeof window !== 'undefined') {
        window.history.pushState({}, '', '/');
      }
    } else if (storedAccessToken) {
      // 로컬 스토리지에서 토큰을 가져와 상태에 저장
      useTokenStore.getState().setAccessToken(storedAccessToken);
      console.log(storedAccessToken);
      useUserStore.getState().setLogin(true);
      fetchUserInfo();
    }
  }, [params]);

  // 사용자 정보를 가져오는 함수
  const fetchUserInfo = async () => {
    try {
      axiosInstance.defaults.headers.common['Authorization'] =
        useTokenStore.getState().accessToken;
      const response = await axiosInstance.get('/user/info');

      const { id, nickname, imageUrl } = response.data.results;
      console.log(response);
      useUserStore.getState().setUser(id, nickname, imageUrl);
      console.log(useUserStore.getState().imageUrl);
    } catch (error) {
      console.error('사용자 정보를 가져오는 데 실패했습니다.', error);
    }
  };
  return (
    <html lang="en">
      <body>
        {theme && (
          <ThemeProvider theme={theme}>
            <GlobalStyles />
            {children}
            <ThemeToggleBtn />
          </ThemeProvider>
        )}
      </body>
    </html>
  );
};

export default RootLayout;
