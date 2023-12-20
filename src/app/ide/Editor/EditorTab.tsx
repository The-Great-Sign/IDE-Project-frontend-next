import React from 'react';
import { useFileStore } from '@/store/useFileStore';
import styled from 'styled-components';
import { AiOutlineClose } from 'react-icons/ai';

// Styled components for tabs
const TabsContainer = styled.div`
  display: flex;
  background: #333;
  padding: 0.5rem;
`;

const Tab = styled.div<{ isSelected: boolean }>`
  margin-right: 0.5rem;
  padding: 0.5rem 1rem;
  background: ${props =>
    props.isSelected ? '#555' : '#444'}; // Conditional styling
  color: white;
  border-radius: 5px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  cursor: pointer;
  &:hover {
    background-color: #555;
  }
`;

const TabTitle = styled.span`
  margin-right: 10px;
`;

const CloseIcon = styled(AiOutlineClose)`
  color: white;
  cursor: pointer;
`;

const EditorTab = () => {
  const { files, selectedFileId, selectFile, closeFile } = useFileStore();

  return (
    <TabsContainer>
      {files.map(file => (
        <Tab
          key={file.id}
          isSelected={file.id === selectedFileId}
          onClick={() => selectFile(file.id)}
        >
          <TabTitle>{file.name}</TabTitle>
          <CloseIcon
            onClick={e => {
              e.stopPropagation(); // Prevents triggering selectFile when closing
              closeFile(file.id);
            }}
          />
        </Tab>
      ))}
    </TabsContainer>
  );
};

export default EditorTab;
