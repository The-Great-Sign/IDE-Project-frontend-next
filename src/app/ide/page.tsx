'use client';
import React, { useEffect } from 'react';
import Chatting from './Chatting/Chatting';
import {
  subscribeChatting,
  subscribeFile,
  subscribeTerminal,
} from '@/app/api/websocket';
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
import useProjectStore from '@/store/useProjectStore';
import LoadingProject from '../project/EnterProject/LoadingProject/LoadingProject';
import { checkFileTree } from '@/utils/checkFileTree';
import { useFileTreeStore } from '@/store/useFileTreeStore';

const Ide = () => {
  const execute = useProjectStore(state => state.status);
  const projectId = useProjectStore.getState().currentProject.id;

  const { selectedFileId } = useFileStore();
  const { isvisibleDiv } = useVisibleDiv();
  const { setFileTree } = useFileTreeStore();

  useEffect(() => {
    console.log('execute', execute);
    if (execute == 'RUNNING') {
      const client = useProjectStore.getState().cRef;
      console.log('client', client);
      subscribeChatting(client);
      subscribeTerminal(client);
      subscribeFile(client);

      checkFileTree(projectId).then(response => {
        console.log(projectId);
        if (response) {
          setFileTree(response.data.results);
          console.log(response.data.results);
        }
      });

      return () => {
        console.log('execute', execute);
        // if (client) {
        //   client.deactivate();
        // }
      };
    }
  }, [execute, projectId, setFileTree]);

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
          <Chatting />
        </IDEContentCode>
      </IDEContainer>
    </main>
  ) : (
    <LoadingProject />
  );
};

export default Ide;
