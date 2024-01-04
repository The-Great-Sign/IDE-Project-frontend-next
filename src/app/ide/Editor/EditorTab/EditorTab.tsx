import React from 'react';
import { useFileStore } from '@/store/useFileStore';

import {
  CloseIcon,
  EditorTabContainer,
  FileClose,
  FileInfo,
  FileTab,
} from './EditorTab.styles';

const EditorTab = () => {
  const { files, selectFile, closeFile } = useFileStore();

  return (
    <EditorTabContainer>
      {files.map(file => (
        <FileTab key={file.id} onClick={() => selectFile(file.id)}>
          <FileInfo>{file.name}</FileInfo>
          <FileClose
            onClick={e => {
              e.stopPropagation();
              closeFile(file.id);
            }}
          >
            <CloseIcon />
          </FileClose>
        </FileTab>
      ))}
    </EditorTabContainer>
  );
};

export default EditorTab;
