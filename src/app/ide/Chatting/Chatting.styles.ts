import { COLORS } from '@/constants/colors';
import { styled } from 'styled-components';

export const ChattingContainer = styled.div`
  overflow: hidden;
  height: 100%;
  width: 100%;
  position: absolute;
  right: 0;
  box-sizing: border-box;
  border-left: 1px solid ${COLORS.primary};
  border-top: 1px solid ${COLORS.primary};
`;
