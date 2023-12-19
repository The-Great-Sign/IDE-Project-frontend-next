import React from 'react';
import {
  AIChattingDiv,
  ChattingMessages,
  // ChattingMessage, ChattingName, ChattingContent,
  ChattingInputForm,
  ChattingInput,
  ChattingSendButton,
} from './Chatting.style';

const AIChatting = () => {
  return (
    <AIChattingDiv>
      <ChattingMessages>
        {/* {messages.map((message) => {
          const { id, name, content } = message;
          <ChattingMessage id={id}>
            <ChattingName>{name}</ChattingName>
            <ChattingContent>{content}</ChattingContent>
          </ChattingMessage>
        })} */}
      </ChattingMessages>

      <ChattingInputForm>
        <ChattingInput placeholder="채팅을 입력하세요" />
        <ChattingSendButton>전송</ChattingSendButton>
      </ChattingInputForm>
    </AIChattingDiv>
  );
};

export default AIChatting;
