'use client';

import React, { useEffect } from 'react';
import { ThemeProvider } from 'styled-components';
import GlobalStyles from '@/styles/globalStyles';
import useThemeStore from '@/store/useThemeStore';
import ThemeToggleBtn from '@/components/ThemeToggleBtn/ThemeToggleBtn';
import { useSearchParams } from 'next/navigation';
import { firstTokenStore } from '@/utils/token/storeTokenFromUrl';
import { reloadTokenSetting } from '@/utils/token/reloadTokenSetting';
import useTokenStore from '@/store/useTokenStore';

const RootLayout = ({ children }: { children: React.ReactNode }) => {
  const theme = useThemeStore(state => state.theme);
  const params = useSearchParams();

  useEffect(() => {
    const accessTokenFromURL = params.get('token');
    const refreshTokenFromURL = params.get('refresh_token');
    const storedAccessToken = localStorage.getItem('accessToken');

    if (accessTokenFromURL && refreshTokenFromURL) {
      firstTokenStore(accessTokenFromURL, refreshTokenFromURL);
    } else if (storedAccessToken) {
      reloadTokenSetting(storedAccessToken);
    } else {
      useTokenStore.getState().setLogin(false);
    }
  }, [params]);

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
