'use client';

import React, { useEffect } from 'react';
import { ThemeProvider } from 'styled-components';
import GlobalStyles from '@/styles/globalStyles';
import useThemeStore from '@/store/useThemeStore';
import ThemeToggleBtn from '@/components/ThemeToggleBtn/ThemeToggleBtn';
import { useSearchParams } from 'next/navigation';
import { storeTokenFromUrl } from '@/utils/token/storeTokenFromUrl';
import { reloadTokenSetting } from '@/utils/token/reloadTokenSetting';
import useTokenStore from '@/store/useTokenStore';
import { Pretendard } from '@/utils/font/fetchPretendard';

const RootLayout = ({ children }: { children: React.ReactNode }) => {
  const theme = useThemeStore(state => state.theme);
  const params = useSearchParams();

  useEffect(() => {
    const accessTokenFromURL = params.get('token');
    const refreshTokenFromURL = params.get('refresh_token');
    const storedAccessToken = localStorage.getItem('accessToken');

    if (accessTokenFromURL && refreshTokenFromURL) {
      storeTokenFromUrl(accessTokenFromURL, refreshTokenFromURL);

      if (typeof window !== 'undefined') {
        if (localStorage.getItem('invitedProjectId')) {
          const newUrl = `/ide/${localStorage.getItem('invitedProjectId')}`;
          window.history.pushState({}, '', newUrl);
          window.location.reload();

          // router.push(`/ide/${localStorage.getItem('invitedProjectId')}`);
        } else {
          window.history.pushState({}, '', '/');
        }
      }
    } else if (storedAccessToken) {
      reloadTokenSetting(storedAccessToken);
    } else {
      useTokenStore.getState().setLogin(false);
    }
  }, [params]);

  return (
    <html lang="en" className={Pretendard.className}>
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
