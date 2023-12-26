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
import axiosInstance from '@/app/api/axiosInstance';
import { Client } from '@stomp/stompjs';
import { Terminal as XTerm } from 'xterm';
import axios from 'axios';
import useTokenStore from '@/store/useTokenStore';
import useUserStore from '@/store/useUserStore';

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
  const { setFileTree } = useFileTreeStore();

  useEffect(() => {
    const storedAccessToken = localStorage.getItem('accessToken');

    if (storedAccessToken) {
      // 로컬 스토리지에서 토큰을 가져와 상태에 저장
      useTokenStore.getState().setAccessToken(storedAccessToken);
      console.log(storedAccessToken);
      useUserStore.getState().setLogin(true);
      fetchUserInfo();
    }
  }, []);

  // 사용자 정보를 가져오는 함수
  const fetchUserInfo = async () => {
    try {
      axiosInstance.defaults.headers.common['Authorization'] =
        localStorage.getItem('accessToken');
      console.log('혹시 여기 있나');
      console.log(useTokenStore.getState().accessToken);
      const response = await axiosInstance.get('/user/info');

      const { id, nickname, imageUrl } = response.data.results;
      console.log(response);
      useUserStore.getState().setUser(id, nickname, imageUrl);
      console.log(useUserStore.getState().imageUrl);
    } catch (error) {
      console.error('사용자 정보를 가져오는 데 실패했습니다.', error);
    }
  };

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
        console.log(localStorage.getItem('accessToken'));
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
            <EditorTab />
            {selectedFileId && <ShowEditor fileId={selectedFileId} />}
            <Terminal
              clientRef={clientRef}
              terminalRef={terminalRef}
              xtermRef={xtermRef}
              currentPath={currentPath}
            />
          </Section>
          <Chatting clientRef={clientRef} />
        </IDEContentCode>
      </IDEContainer>
    </main>
  ) : (
    <LoadingProject />
  );
};

export default Ide;
