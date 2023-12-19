import React from 'react';
import {
  GeneralChattingDiv,
  ChattingMessages,
  // ChattingMessage, ChattingName, ChattingContent,
  ChattingInputForm,
  ChattingInput,
  ChattingSendButton,
} from './Chatting.style';

const GeneralChatting = () => {
  return (
    <GeneralChattingDiv>
      <ChattingMessages>
        {/* {testMessages.map((testMessage) => {
          const { name, content } = testMessage;
          return(
            <ChattingMessage>
              <ChattingName>{name}</ChattingName>
              <ChattingContent>{content}</ChattingContent>
            </ChattingMessage>
          );
        })} */}
      </ChattingMessages>

      <ChattingInputForm>
        <ChattingInput placeholder="채팅을 입력하세요" />
        <ChattingSendButton>전송</ChattingSendButton>
      </ChattingInputForm>
    </GeneralChattingDiv>
  );
};

export default GeneralChatting;
