import { DefaultTheme } from 'styled-components';

export const lightTheme: DefaultTheme = {
  colors: {
    primary: '#404EED',
    bg: '#F6F8F9',
    headerBg: '#fff;',
    btnHover: '#D9DCFB',
    btnText: '#333EBE',
    black: '#000',
    text: '#333',
    loginTitle: '#333',
    boxShadow: '0 2px 5px rgba(0, 0, 0, 0.2)',
    menuHover: '#f0f0f0',
  },
};

export const darkTheme: DefaultTheme = {
  colors: {
    primary: '#404EED',
    bg: '#1B1D24',
    headerBg: '#1B1D24',
    btnHover: '#D9DCFB',
    btnText: '#333EBE',
    black: '#000',
    text: '#fff',
    loginTitle: '#333',
    boxShadow: '0 4px 8px rgba(255, 255, 255, 0.05)',
    menuHover: '#131519',
  },
};
