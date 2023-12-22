'use client';

import React from 'react';
import { ThemeProvider } from 'styled-components';
import GlobalStyles from '@/styles/globalStyles';
import useThemeStore from '@/store/useThemeStore';
import ThemeToggleBtn from '@/components/ThemeToggleBtn/ThemeToggleBtn';

const RootLayout = ({ children }: { children: React.ReactNode }) => {
  const theme = useThemeStore(state => state.theme);
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
