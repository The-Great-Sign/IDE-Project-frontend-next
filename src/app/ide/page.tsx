'use client';

import { Room } from '@/app/ide/Room';
// import { CollaborativeEditor } from '@/app/ide/Editor/CollaborativeEditor';
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
import ShowEditor from './Editor/ShowEditor';
import { useFileStore } from '@/store/useFileStore';
import EditorTab from './Editor/EditorTab';

const Ide = () => {
  const { selectedFileId } = useFileStore();

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
            <Chatting />
          </IDEContentCode>
        </IDEContainer>
      </Room>
    </main>
  );
};

export default Ide;
