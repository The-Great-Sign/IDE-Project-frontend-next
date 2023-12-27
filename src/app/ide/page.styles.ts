import { COLORS } from '@/constants/colors';
import { FONTS } from '@/constants/fonts';
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
  position: relative;
  display: flex;
  flex-direction: column;
  flex-grow: 1;
  width: 100%;
  height: 100%;
  overflow: hidden;
  border-left: 1px solid ${COLORS.primary};
  height: 100vh;
`;

export const EditorBox = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 50%;
`;

export const EditorMain = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  text-align: center;
  justify-content: center;
  align-items: center;
  padding-bottom: 60px;
  font-size: ${FONTS.lg};
  font-weight: 600;
`;
