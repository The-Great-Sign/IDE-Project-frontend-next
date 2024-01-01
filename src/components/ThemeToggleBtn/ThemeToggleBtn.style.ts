import styled from 'styled-components';

export const ThemeBtn = styled.button`
  position: fixed;
  left: 30px;
  bottom: 30px;
  background: none;
  border: none;
  cursor: pointer;
  color: ${props => props.theme.colors.text};
`;
