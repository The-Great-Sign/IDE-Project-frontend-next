import { COLORS } from '@/constants/colors';
import { styled } from 'styled-components';

export const ChattingContainer = styled.div`
  overflow: hidden;
  display: flex;
  flex-direction: column;
  height: 100%;
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
  height: 48px;
  border: 2px solid blue;
`;

export const ChattingTab = styled.button<{ $isActive: boolean }>`
  width: 50%;
  height: 100%;
  justify-content: center;
  align-items: center;
  font-size: 16px;
  color: white;
  border: 1px solid blue;
  background-color: ${props => (props.$isActive ? 'blue' : 'transparent')};
  &:hover {
    background-color: blue;
  }
  &:active {
    background-color: blue;
  }
`;

export const GeneralChattingDiv = styled.div`
  display: flex;
  flex-direction: column;
  max-height: 100%;
  padding-bottom: 56px;
`;

export const AIChattingDiv = styled.div`
  display: flex;
  flex-direction: column;
  max-height: 100%;
  padding-bottom: 56px;
`;

export const ChattingMessages = styled.div`
  overflow-y: auto;
  padding: 10px;
  flex-grow: 1;
  margin-bottom: 56px;
`;

export const ChattingMessage = styled.div`
  display: flex;
  flex-direction: column;
  margin: 5px;
  padding: 10px;
  background-color: gray;
  border-radius: 5px;
`;

export const ChattingName = styled.div`
  font-weight: bold;
`;

export const ChattingContent = styled.div`
  display: flex;
  flex-grow: 1;
  white-space: normal; /* 기본적인 줄바꿈 행동을 활성화 */
  word-wrap: break-word; /* 넘치는 텍스트를 줄바꿈 */
  overflow-wrap: break-word; /* 최신 브라우저에서도 줄바꿈 보장 */
  word-break: break-all; /* 강제로 단어를 어느 지점에서든 줄바꿈 */
`;

export const ChattingInputForm = styled.form`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 56px;
  padding: 8px;
  position: absolute;
  bottom: 0;
  border: 2px solid blue;
`;

export const ChattingInput = styled.textarea`
  height: 38px;
  padding: 4px;
  flex-grow: 1;
  font-size: 16px;
  border: none;
  border-radius: 4px;
  resize: none;
  overflow-x: hidden;
  overflow-y: auto;
  &:focus {
    outline: none;
  }
`;

export const ChattingSendButton = styled.button`
  width: 64px;
  height: 40px;
  border-radius: 5px;
`;
