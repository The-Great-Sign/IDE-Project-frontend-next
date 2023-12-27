'use client';

import { create } from 'zustand';
import { darkTheme, lightTheme } from '@/styles/theme';
import LocalStorage from '@/utils/localstorage';

interface ThemeState {
  theme: typeof lightTheme | typeof darkTheme | undefined;
  isDarkMode: boolean;
  toggleTheme: () => void;
}

const getInitialTheme = () => {
  const storedTheme = LocalStorage.getItem('isDarkMode');
  if (storedTheme !== null) {
    return storedTheme === 'true' ? darkTheme : lightTheme;
  }
  if (typeof window !== 'undefined') {
    return window.matchMedia('(prefers-color-scheme: dark)').matches
      ? darkTheme
      : lightTheme;
  }
};

const useThemeStore = create<ThemeState>(set => ({
  theme: getInitialTheme(),
  isDarkMode: LocalStorage.getItem('isDarkMode') === 'true',
  toggleTheme: () => {
    set(state => {
      const newIsDarkMode = !state.isDarkMode;
      LocalStorage.setItem('isDarkMode', newIsDarkMode ? 'true' : 'false');
      return {
        theme: newIsDarkMode ? darkTheme : lightTheme,
        isDarkMode: newIsDarkMode,
      };
    });
  },
}));

export default useThemeStore;
