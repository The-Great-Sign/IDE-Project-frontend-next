'use client';
import React, { useEffect, useRef, useState } from 'react';
import Chatting from './Chatting/Chatting';
import {
  initializeWebSocket,
  subscribeChatting,
  subscribeFile,
  subscribeLoading,
  // subscribeLoading,
  subscribeTerminal,
} from '@/app/api/websocket';
import { Room } from './Room';
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
import EditorTab from './Editor/EditorTab/EditorTab';
import { useVisibleDiv } from '@/store/useVisibleDiv';
import ShowEditor from './Editor/ShowEditor';
import { useFileStore } from '@/store/useFileStore';
import LoadingProject from '@/app/project/EnterProject/LoadingProject/LoadingProject';
import { checkFileTree } from '@/utils/checkFileTree';
import { useFileTreeStore } from '@/store/useFileTreeStore';
import axiosInstance from '@/app/api/axiosInstance';
import { Client } from '@stomp/stompjs';

const Ide = () => {
  const [execute, setExecute] = useState<string>('PENDING');
  const clientRef = useRef<Client | null>(null);

  const { selectedFileId } = useFileStore();
  const { isvisibleDiv } = useVisibleDiv();
  const { setFileTree } = useFileTreeStore();

  const getCurrentProjectId = () => {
    const path = window.location.pathname;
    const pathSegments = path.split('/');
    const projectId = pathSegments[2];
    return projectId;
  };

  const postEnterProject = async (projectId: string) => {
    try {
      const response = await axiosInstance.post(
        // http 보내기
        `/api/projects/${projectId}/run`
      );
      const data = response.data;
      setExecute(data.results); // 답 받아오기
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    const projectId = getCurrentProjectId();
    postEnterProject(projectId);
    if (execute == 'PENDING') {
      // 로딩 웹소캣 연결
      console.log('pending');
      if (clientRef.current == null) {
        clientRef.current = initializeWebSocket();
        const client = clientRef.current;
        if (client) {
          client.onConnect = () => {
            subscribeLoading(clientRef.current, getCurrentProjectId());
            subscribeChatting(clientRef.current, getCurrentProjectId());
            subscribeTerminal(clientRef.current, getCurrentProjectId());
            subscribeFile(clientRef.current, getCurrentProjectId());
          };
        }
        clientRef.current.activate();
      }
    } else {
      // RUNNING 상태라면 나머지 연결
      console.log('connection');
      console.log(execute);
      console.log(clientRef.current);
    }
    checkFileTree(projectId).then(response => {
      console.log(projectId);
      if (response) {
        setFileTree(response.data.results);
        console.log(response.data.results);
      }
    });

    return () => {};
  }, [execute]);

  return execute == 'RUNNING' ? (
    <main>
      <Room>
        <IDEContainer>
          <IDEHeader />
          <IDEContentCode>
            <ContentContainer>
              <Toolbar />
            </ContentContainer>
            {isvisibleDiv ? <FileTree /> : <></>}

            <Section>
              <EditorTab />
              {selectedFileId && <ShowEditor fileId={selectedFileId} />}
              <TerminalTest />
            </Section>
            <Chatting />
          </IDEContentCode>
        </IDEContainer>
      </Room>
    </main>
  ) : (
    <LoadingProject />
  );
};

export default Ide;
