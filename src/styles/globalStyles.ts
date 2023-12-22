'use client';

import { createGlobalStyle } from 'styled-components';

const GlobalStyles = createGlobalStyle`
  body{
    background: ${props => props.theme.colors.bg};
    color: ${props => props.theme.colors.text};
    margin: 0;
    padding: 0;
  }
`;

export default GlobalStyles;
