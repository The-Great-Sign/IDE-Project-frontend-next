'use client';
import React, { useEffect } from 'react';
import Chatting from './Chatting/Chatting';
import {
  subscribeChatting,
  subscribeFile,
  subscribeTerminal,
} from '@/app/api/websocket';
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
import { useVisibleDiv } from '@/store/useVisibleDiv';
import EditorTab from './Editor/EditorTab';
import ShowEditor from './Editor/ShowEditor';
import { useFileStore } from '@/store/useFileStore';
import useProjectStore from '@/store/useProjectStore';
import LoadingProject from '../project/EnterProject/LoadingProject/LoadingProject';

const Ide = () => {
  const execute = useProjectStore(state => state.status);

  const { selectedFileId } = useFileStore();
  const { isvisibleDiv } = useVisibleDiv();

  useEffect(() => {
    console.log('execute', execute);
    if (execute == 'RUNNING') {
      const client = useProjectStore.getState().cRef;
      console.log('client', client);
      subscribeChatting(client);
      subscribeTerminal(client);
      subscribeFile(client);

      return () => {
        console.log('execute', execute);
        // if (client) {
        //   client.deactivate();
        // }
      };
    }
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
