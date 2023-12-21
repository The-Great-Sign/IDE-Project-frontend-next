import { useState } from 'react';
import { darkTheme, lightTheme } from '@/styles/theme';

const useAppTheme = () => {
  const [isDarkMode, setIsDarkMode] = useState(false);

  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode);
  };

  const theme = isDarkMode ? darkTheme : lightTheme;

  return { theme, toggleTheme, isDarkMode };
};

export default useAppTheme;
