import { useState } from 'react';
import { Resizable } from 're-resizable';
import GeneralChatting from './GeneralChatting';
import AIChatting from './AIChatting';
import {
  ChattingContainer,
  ChattingHeader,
  ChattingTab,
} from './Chatting.style';

const Chatting = () => {
  const [activeTab, setActiveTab] = useState<string>('채팅');

  const handleClick = (tab: string) => {
    // true: 채팅, false: AI
    setActiveTab(tab);
  };

  return (
    <Resizable
      defaultSize={{
        width: '300px',
        height: 'calc(100vh - 50px)',
      }}
      enable={{
        top: false, // 위쪽으로만 리사이징 가능
        right: false,
        bottom: false,
        left: true,
        topRight: false,
        bottomRight: false,
        bottomLeft: false,
        topLeft: false,
      }}
      minWidth={'140px'}
      maxWidth={'400px'}
    >
      <ChattingContainer>
        <ChattingHeader>
          {/* {`채팅 (${CurrentUsers})`} */}
          <ChattingTab
            onClick={() => handleClick('채팅')}
            $isActive={activeTab === '채팅'}
          >
            채팅
          </ChattingTab>
          <ChattingTab
            onClick={() => handleClick('AI✨')}
            $isActive={activeTab === 'AI✨'}
          >
            AI✨
          </ChattingTab>
        </ChattingHeader>
        {activeTab === '채팅' ? <GeneralChatting /> : <AIChatting />}
      </ChattingContainer>
    </Resizable>
  );
};

export default Chatting;
