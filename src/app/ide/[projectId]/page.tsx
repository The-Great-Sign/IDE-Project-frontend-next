'use client';
import React, { useEffect, useRef, useState } from 'react';
import Chatting from '../Chatting/Chatting';
import {
  SubscribeProps,
  initializeWebSocket,
  subscribeChatting,
  subscribeFile,
  // subscribeLoading,
  subscribeTerminal,
} from '@/app/api/websocket';
import {
  ContentContainer,
  IDEContainer,
  IDEContentCode,
  Section,
} from '../page.styles';
import IDEHeader from '../Header/IDEHeader';
import FileTree from '../FileTree/FileTree';
import TerminalTest from '../Terminal/TerminalTest';
import Toolbar from '../Toolbar/Toolbar';
import EditorTab from '../Editor/EditorTab/EditorTab';
import { useVisibleDiv } from '@/store/useVisibleDiv';
import ShowEditor from '../Editor/ShowEditor';
import { useFileStore } from '@/store/useFileStore';
import LoadingProject from '@/app/project/EnterProject/LoadingProject/LoadingProject';
import { checkFileTree } from '@/utils/checkFileTree';
import { useFileTreeStore } from '@/store/useFileTreeStore';
import axiosInstance from '@/app/api/axiosInstance';
import { Client } from '@stomp/stompjs';

interface LoadingStatusProps {
  containerId: string;
  status: 'PENDING' | 'RUNNING';
}

export const getCurrentProjectId = () => {
  const path = window.location.pathname;
  const pathSegments = path.split('/');
  const projectId = pathSegments[2];
  return projectId;
};

const Ide = () => {
  const [execute, setExecute] = useState<string>('PENDING');
  const clientRef = useRef<Client | null>(null);

  const { selectedFileId } = useFileStore();
  const { isvisibleDiv } = useVisibleDiv();
  const { setFileTree } = useFileTreeStore();

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

  const subscribeLoading = (
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

  useEffect(() => {
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
            subscribeTerminal(clientRef.current, getCurrentProjectId());
            subscribeFile(clientRef.current, getCurrentProjectId());
          };
        }
        clientRef.current.activate();
      }
    }
    checkFileTree(projectId).then(response => {
      if (response) {
        setFileTree(response.data.results);
      }
    });

    return () => {};
  }, [execute]);

  return execute == 'RUNNING' ? (
    <main>
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
          <Chatting clientRef={clientRef} />
        </IDEContentCode>
      </IDEContainer>
    </main>
  ) : (
    <LoadingProject />
  );
};

export default Ide;
