import { COLORS } from '@/constants/colors';
import styled from 'styled-components';

interface ChattingTabProps {
  isActive: boolean;
}

export const ChattingContainer = styled.div`
  overflow: hidden;
  display: flex;
  box-sizing: border-box;
  flex-direction: column;
  height: calc(100vh - 51px);
  width: 100%;
  position: absolute;
  right: 0;
  box-sizing: border-box;
  border-left: 1px solid ${COLORS.primary};
  border-top: 1px solid ${COLORS.primary};
`;

export const ChattingHeader = styled.div`
  display: flex;
  width: 100%;
  height: 35px;
`;

export const ChattingTab = styled.button<ChattingTabProps>`
  width: 50%;
  height: 100%;
  justify-content: center;
  align-items: center;
  font-size: 16px;
  background-color: ${props => (props.isActive ? COLORS.primary : '')};
  border: 1px solid ${COLORS.primary};
  &:hover {
    background-color: ${COLORS.primary};
  }
`;

export const GeneralChattingDiv = styled.div`
  display: flex;
  flex-direction: row;
  max-height: calc(100vh - 86px);
`;

export const AIChattingDiv = styled.div`
  display: flex;
  flex-direction: column;
  max-height: calc(100vh - 86px);
`;

export const ChattingMessages = styled.div`
  margin-bottom: 60px;
  overflow-y: auto;
  padding: 10px;
  flex-grow: 1;
`;

export const ChattingMessage = styled.div`
  display: flex;
  flex-direction: column;
  margin: 5px;
  padding: 10px;
  background-color: gray;
  border-radius: 5px;
  line-height: 1.5px;
`;

export const ChattingName = styled.div`
  font-weight: bold;
`;

export const ChattingContent = styled.div`
  display: flex;
  flex-grow: 1;
  white-space: normal;
  word-wrap: break-word;
  overflow-wrap: break-word;
  word-break: break-all;
`;

export const ChattingInputForm = styled.form`
  display: flex;
  margin-top: 10px;
  margin-bottom: 2px;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 40px;
  padding: 8px;
  position: absolute;
  bottom: 0;
`;

export const ChattingInput = styled.textarea`
  width: 80%;
  height: 90%;
  margin-right: 5px;
  padding: 6px;
  flex-grow: 1;
  font-size: 16px;
  border: none;
  resize: none;
  overflow-x: hidden;
  overflow-y: auto;
  &:focus {
    outline: none;
  }
`;

export const ChattingSendButton = styled.button`
  width: 15%;
  height: 100%;
  margin-right: 12px;
  border: none;
  border-radius: 10px;
  &:hover {
    background-color: ${COLORS.primary};
  }
`;

export const CodeReviewBtn = styled.button`
  padding: 1px;
  border: none;
  &:hover {
    background-color: ${COLORS.primary};
  }
`;
