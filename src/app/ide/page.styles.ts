import { COLORS } from '@/constants/colors';
import styled from 'styled-components';

export const IDEContainer = styled.div`
  flex-direction: column;
  max-width: 100%;
  overflow: hidden;
  position: fixed;
  left: 0;
  right: 0;
  bottom: 0;
  top: 0;
`;

export const IDEContentCode = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  flex-grow: 1;
`;

export const ContentContainer = styled.div`
  display: flex;
  flex-direction: row;
`;

export const CodeContainer = styled.div`
  display: flex;
  flex-direction: column;
  flex-grow: 1;
`;

export const Section = styled.div`
  display: flex;
  flex-direction: column;
  flex-grow: 1;
  max-height: calc(100vh - 50px);
  width: 100%;
  overflow: hidden;
  border-left: 1px solid ${COLORS.primary};
`;
