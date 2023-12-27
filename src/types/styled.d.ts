import 'styled-components';

declare module 'styled-components' {
  export interface DefaultTheme {
    colors: {
      primary: string;
      bg: string;
      headerBg: string;
      btnHover: string;
      btnText: string;
      black: string;
      text: string;
      loginTitle: string;
      boxShadow: string;
      menuHover: string;
    };
  }
}
