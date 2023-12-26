import { COLORS } from '@/constants/colors';
import styled from 'styled-components';

export const TerminalContainer = styled.div`
  display: flex;
  position: sticky;
  top: 0;
  left: 0;
  border-top: 1px solid ${COLORS.primary};
  height: 100%;
  width: 100%;
`;
