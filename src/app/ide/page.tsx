'use client';

import { Room } from '@/app/ide/Room';
import { CollaborativeEditor } from '@/app/ide/Editor/CollaborativeEditor';
import {
  ContentContainer,
  IDEContainer,
  IDEContentCode,
  Section,
} from './page.styles';
import IDEHeader from './Header/IDEHeader';

import FileTree from './FileTree/FileTree';
import TerminalTest from './Terminal/TerminalTest';
import Chatting from './Chatting/Chatting';
import Toolbar from './Toolbar/Toolbar';

const Ide = () => {
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
              <CollaborativeEditor />
              {/* <CodeEditor /> */}
              <TerminalTest />
            </Section>
            <Chatting />
          </IDEContentCode>
        </IDEContainer>
        {/* <MainHeader /> */}
      </Room>
    </main>
  );
};

export default Ide;
