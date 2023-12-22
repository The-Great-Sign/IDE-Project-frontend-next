import styled from 'styled-components';

export const ThemeBtn = styled.button`
  position: fixed;
  left: 50px;
  bottom: 50px;
  background: none;
  border: none;
  cursor: pointer;
  color: ${props => props.theme.colors.text};
`;
