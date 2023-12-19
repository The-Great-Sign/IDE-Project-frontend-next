import { COLORS } from '@/constants/colors';
import styled from 'styled-components';

export const EditorContainer = styled.div`
  display: flex;
  flex-direction: column;
  position: relative;
  width: 100%;
  height: 100%;
  overflow: hidden;
`;

export const EditorHeader = styled.div`
  height: 20px;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

export const Editor = styled.div`
  position: relative;
  flex-grow: 1;
  overflow: auto;
`;

export const EditorTab = styled.div`
  width: 100%;
  height: 35px;
  display: flex;
  align-items: center;
  border-top: 1px solid ${COLORS.primary};
  border-bottom: 1px solid ${COLORS.primary};
  flex-direction: row;
  justify-content: space-evenly;
`;

export const FileTab = styled.div`
  width: 100%;
  text-align: center;
  height: 35px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  border-right: 1px solid ${COLORS.primary};
  white-space: nowrap;
`;

export const FileInfo = styled.div`
  padding-left: 10px;
`;

export const FileClose = styled.div`
  display: flex;
  height: 35px;
  width: 35px;
  justify-content: center;
  align-items: center;
`;
