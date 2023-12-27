import { FONTS } from '@/constants/fonts';
import styled from 'styled-components';

export const HeaderContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  height: 68px;
  background: ${props => props.theme.colors.headerBg};
  z-index: 2;
`;

export const Logo = styled.div`
  font-size: ${FONTS.lg};
  font-weight: 700;
`;
