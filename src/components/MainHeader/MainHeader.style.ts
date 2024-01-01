import { FONTS_WEIGHT } from './../../constants/fonts';
import { FONTS } from '@/constants/fonts';
import styled from 'styled-components';
import Link from 'next/link';

export const HeaderContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  height: 68px;
  background: ${props => props.theme.colors.headerBg};
  z-index: 2;
  font-weight: ${FONTS_WEIGHT.medium};
`;

export const Logo = styled.div`
  font-size: ${FONTS.lg};
  font-weight: 700;
  padding-left: 60px;
`;

export const StyledLink = styled(Link)`
  text-decoration: none;
  color: ${props => props.theme.colors.text};
`;
