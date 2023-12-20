'use client';
import React, { useEffect, useRef, useState } from 'react';
import Chatting from './Chatting/Chatting';
import { Client } from '@stomp/stompjs';
import initializeWebSocket from '@/app/api/websocket';
import useGeneralChatStore, {
  GeneralMessageType,
} from '@/store/useChattingStore';
import { Room } from '@/app/ide/Room';
import {
  ContentContainer,
  IDEContainer,
  IDEContentCode,
  Section,
} from './page.styles';
import IDEHeader from './Header/IDEHeader';
import FileTree from './FileTree/FileTree';
import TerminalTest from './Terminal/TerminalTest';
import Toolbar from './Toolbar/Toolbar';
import { testWebsocket } from '@/app/api/websocket';
import EditorTab from './Editor/EditorTab';
import ShowEditor from './Editor/ShowEditor';
import { useFileStore } from '@/store/useFileStore';
interface ReceivedMessageType {
  messageType: string;
  userNickname: string;
  content: string;
  currentUsers: number;
}

const Ide = () => {
  const { selectedFileId } = useFileStore();

  const clientRef = useRef<Client | null>(null);
  const [cRef, setCRef] = useState<Client | null>(null);
  const [users, setUsers] = useState<number>(0);

  useEffect(() => {
    if (clientRef.current == null) {
      clientRef.current = initializeWebSocket();
    }

    const client = clientRef.current;
    if (client) {
      client.onConnect = () => {
        client.subscribe(
          `/topic/project/${testWebsocket.projectId}/chat`,
          ReceivedMessage => {
            const { messageType, userNickname, content, currentUsers } =
              JSON.parse(ReceivedMessage.body) as ReceivedMessageType;

            let enumMessageType: GeneralMessageType;
            switch (messageType) {
              case 'ENTER':
                enumMessageType = GeneralMessageType.ENTER;
                break;
              case 'EXIT':
                enumMessageType = GeneralMessageType.EXIT;
                break;
              case 'TALK':
                enumMessageType = GeneralMessageType.TALK;
                break;
              default:
                throw new Error(`Unknown message type: ${messageType}`);
            }

            useGeneralChatStore.getState().addMessage({
              messageType: enumMessageType,
              userNickname,
              content,
              currentUsers,
            });
            setUsers(currentUsers);
            console.log(`Received: ${ReceivedMessage.body}`);
          }
        );
        client.subscribe(
          `/user/queue/project/${testWebsocket.projectId}/terminal`,
          ReceivedTerminal => {
            console.log('terminal connected');
            console.log(`Received: ${ReceivedTerminal.body}`);
          }
        );
        client.subscribe(
          ` /topic/project/${testWebsocket.projectId}/file`,
          ReceivedFile => {
            console.log('file connected');
            console.log(`Received: ${ReceivedFile.body}`);
          }
        );
        client.onStompError = frame => {
          console.error('WebSocket Error:', frame);
        };
      };
      client.activate();
      setCRef(client);
    }

    return () => {
      if (client) {
        client.deactivate();
      }
    };
  }, []);

  return (
    <main>
      <Room>
        <IDEContainer>
          <IDEHeader />
          <IDEContentCode>
            <ContentContainer>
              <Toolbar />
            </ContentContainer>
            <FileTree />

            <Section>
              <EditorTab />
              {selectedFileId && <ShowEditor fileId={selectedFileId} />}
              <TerminalTest />
            </Section>
            <Chatting client={cRef} users={users} />
          </IDEContentCode>
        </IDEContainer>
      </Room>
    </main>
  );
};

export default Ide;
