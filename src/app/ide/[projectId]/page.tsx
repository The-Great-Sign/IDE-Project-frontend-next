'use client';
import React, { useEffect, useRef, useState } from 'react';
import Chatting from '../Chatting/Chatting';
import {
  LoadingStatusProps,
  SubscribeProps,
  initializeWebSocket,
  subscribeChatting,
  subscribeFile,
} from '@/app/api/websocket';
import {
  ContentContainer,
  EditorBox,
  EditorMain,
  IDEContainer,
  IDEContentCode,
  Section,
} from '../page.styles';
import IDEHeader from '../Header/IDEHeader';
import FileTree from '../FileTree/FileTree';
import Terminal from '../Terminal/Terminal';
import Toolbar from '../Toolbar/Toolbar';
import EditorTab from '../Editor/EditorTab/EditorTab';
import { useVisibleDiv } from '@/store/useVisibleDiv';
import ShowEditor from '../Editor/ShowEditor';
import { useFileStore } from '@/store/useFileStore';
import LoadingProject from '@/app/project/EnterProject/LoadingProject/LoadingProject';
import { checkFileTree } from '@/app/api/filetree/updateFileTree';
import { useFileTreeStore } from '@/store/useFileTreeStore';
import { Client } from '@stomp/stompjs';
import { Terminal as XTerm } from 'xterm';
import axios from 'axios';
import useTokenStore from '@/store/useTokenStore';
import { reloadTokenSetting } from '@/utils/token/reloadTokenSetting';
import { useRouter } from 'next/navigation';
import useUserStore from '@/store/useUserStore';
import { useVisibleChat } from '@/store/useChattingStore';
import { TerminalContainer } from '../Terminal/Terminal.styles';
import { Resizable } from 're-resizable';


interface ReceivedTerminalType {
  success: boolean;
  path: string;
  content: string;
}

export const getCurrentProjectId = () => {
  const path = window.location.pathname;
  const pathSegments = path.split('/');
  const projectId = pathSegments[2];
  return projectId;
};

const Ide = () => {
  const clientRef = useRef<Client | null>(null);
  const terminalRef = useRef<HTMLDivElement>(null);
  const xtermRef = useRef<XTerm | null>(null);
  const [execute, setExecute] = useState<string>('PENDING');
  const [currentPath, setCurrentPath] = useState<string>('/');

  const { selectedFileId } = useFileStore();
  const { isvisibleDiv } = useVisibleDiv();
  const { isvisibleChat } = useVisibleChat();
  const { setFileTree } = useFileTreeStore();

  const router = useRouter();

  useEffect(() => {
    const storedAccessToken = useTokenStore.getState().accessToken;
    if (storedAccessToken) {
      reloadTokenSetting(storedAccessToken);
    } else {
      router.push(`/`);
    }
  }, []);

  const subscribeLoading = (
    // 로딩 구독
    client: Client | null,
    projectId: string
  ): SubscribeProps => {
    if (client) {
      return client.subscribe(
        `/topic/project/${projectId}/container-loading`,
        ReceivedLoading => {
          const data = JSON.parse(ReceivedLoading.body) as LoadingStatusProps;
          setExecute(data.status);
        }
      );
    }
    return null;
  };

  const subscribeTerminal = (
    client: Client | null,
    xtermRef: React.RefObject<XTerm>,
    projectId: string
  ): SubscribeProps => {
    // 터미널 구독
    if (client && xtermRef.current) {
      return client.subscribe(
        `/user/queue/project/${projectId}/terminal`,
        ReceivedTerminal => {
          console.log(ReceivedTerminal);
          const { success, path, content } = JSON.parse(
            ReceivedTerminal.body
          ) as ReceivedTerminalType;
          if (success && content) {
            if (xtermRef.current) {
              xtermRef.current.write(content + '\r\n' + '\r\n');
            }
          }
          if (xtermRef.current) {
            xtermRef.current.write(path + ': ');
          }
          setCurrentPath(path);
          console.log(`path: ${path}, content: ${content}`);
          console.log(`currentPath: ${path}, content: ${content}`);
        }
      );
    }
    return null;
  };

  useEffect(() => {
    const postEnterProject = async (projectId: string) => {
      try {
        const response = await axios.post(
          `${process.env.NEXT_PUBLIC_BACKEND_URI}/api/projects/${projectId}/run`,
          {},

          {
            headers: {
              'Content-Type': 'application/json',
              'Access-Control-Allow-Origin': '*',
              Authorization: localStorage.getItem('accessToken'),
            },
          }
        );
        console.log(localStorage.getItem('accessToken'));
        const data = response.data;
        setExecute(data.results);
      } catch (error) {
        console.error(error);
      }
    };

    xtermRef.current = new XTerm();
    if (terminalRef.current && xtermRef.current) {
      xtermRef.current.open(terminalRef.current);
    }
    const projectId = getCurrentProjectId();
    postEnterProject(projectId);

    if (execute == 'PENDING') {
      // 로딩 연결
      console.log('pending');
      if (clientRef.current == null) {
        // 웹소캣 연결
        clientRef.current = initializeWebSocket();
        const client = clientRef.current;
        if (client) {
          client.onConnect = () => {
            // 연결되면
            console.log('connected');
            subscribeLoading(clientRef.current, getCurrentProjectId());
            subscribeChatting(clientRef.current, getCurrentProjectId());
            subscribeTerminal(
              clientRef.current,
              xtermRef,
              getCurrentProjectId()
            );
            subscribeFile(clientRef.current, getCurrentProjectId());
          };
        }
        clientRef.current.activate();
      }
    }

    return () => {};
  }, [execute]);

  useEffect(() => {
    checkFileTree(getCurrentProjectId()).then(response => {
      if (response) {
        setFileTree(response.data.results);
      }
    });
  }, [setFileTree]);

  return execute == 'RUNNING' ? (
    <main>
      <IDEContainer>
        <IDEHeader clientRef={clientRef} />
        <IDEContentCode>
          <ContentContainer>
            <Toolbar />
          </ContentContainer>
          {isvisibleDiv ? <FileTree /> : <></>}

          <Section>
            <EditorBox>
              <EditorTab />

              {selectedFileId ? (
                <ShowEditor fileId={selectedFileId} />
              ) : (
                <EditorMain>The Great IDE</EditorMain>
              )}
            </EditorBox>
            <Resizable
              defaultSize={{
                height: '300px', // 초기 높이 설정
                width: '100%',
              }}
              enable={{
                top: true, // 위쪽으로만 리사이징 가능
                right: false,
                bottom: true,
                left: false,
                topRight: false,
                bottomRight: false,
                bottomLeft: false,
                topLeft: false,
              }}
            >
              <TerminalContainer>
                <Terminal
                  clientRef={clientRef}
                  terminalRef={terminalRef}
                  xtermRef={xtermRef}
                  currentPath={currentPath}
                />
              </TerminalContainer>
            </Resizable>
          </Section>
          {isvisibleChat ? <Chatting clientRef={clientRef} /> : <></>}
        </IDEContentCode>
      </IDEContainer>
    </main>
  ) : (
    <LoadingProject />
  );
};

export default Ide;
