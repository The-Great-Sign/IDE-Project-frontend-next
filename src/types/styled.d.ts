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
      contextMenu: string;
      hoverGray: string;
      boxShadow: string;
      menuHover: string;
      boxbg: string;
    };
  }
}
