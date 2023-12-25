import React from 'react';
import { AiFillFolder, AiFillFolderOpen } from 'react-icons/ai';
import { MdArrowRight, MdArrowDropDown, MdEdit } from 'react-icons/md';
import { RxCross2 } from 'react-icons/rx';
import { NodeApi, NodeRendererProps } from 'react-arborist';
import { FileDiv, IsDirty, IsNotDirty, NodeContainer } from './FileTree.styles';
import { useFileTreeStore } from '@/store/useFileTreeStore';
import { FileNodeType } from '@/types/IDE/FileTree/FileDataTypes';
import { isCorrectName } from '@/utils/filetree/fileTreeUtils';
import useHandleOpenFile from '@/app/hooks/useHandleOpenFile';
import LanguageIcon from './LanguageIcon';
import useHandleCreateFile from '@/app/hooks/useHandleCreateFile';
import useHandleDeleteFileRequest from '@/app/hooks/useHandleDeleteFile';
import { findLanguage } from '@/utils/filetree/findFileLangUtils';

export const Node = ({
  node,
  style,
  dragHandle,
  tree,
}: NodeRendererProps<FileNodeType>) => {
  const { updateNodeName } = useFileTreeStore();

  const handleCreateFileRequest = useHandleCreateFile();
  const handleOpenFile = useHandleOpenFile();
  const handleDeleteFileRequest = useHandleDeleteFileRequest();

  const onNodeClick = (node: NodeApi<FileNodeType>) => {
    handleOpenFile(node);
  };

  const onCreateFile = async (newNodeName: string) => {
    const fileNode = {
      ...node.data,
      name: newNodeName,
    };

    if (node.data.name === '') {
      useFileTreeStore.getState().deleteNode(node.id);
    }

    await handleCreateFileRequest(fileNode as FileNodeType, newNodeName);
  };
  const onDeleteFile = async () => {
    try {
      const success = await handleDeleteFileRequest(node.data);
      if (success) {
        tree.delete(node.id);
        alert('삭제 성공');
      } else {
        alert('파일 삭제에 문제가 있습니다.');
      }
    } catch (error) {
      console.error('Error deleting file:', error);
      alert('파일 삭제 중 오류가 발생했습니다.');
    }
  };

  return (
    <NodeContainer className="node-container" style={style} ref={dragHandle}>
      <FileDiv
        className="node-content"
        onClick={() => node.isInternal && node.toggle()}
        isNodeDirty={node.data.isDirty}
      >
        {node.data.type === 'FILE' ? (
          <>
            {node.data.isDirty ? <IsDirty /> : <IsNotDirty />}
            <LanguageIcon
              language={findLanguage(String(node.data.name.split('.').at(-1)))}
            />
          </>
        ) : (
          <>
            <div style={{ display: 'flex', justifyContent: 'center' }}>
              {node.isOpen ? (
                <>
                  <MdArrowDropDown />
                  <AiFillFolderOpen
                    size="18px"
                    style={{ margin: '0 2px 0 0 ' }}
                  />
                </>
              ) : (
                <>
                  <MdArrowRight />{' '}
                  <AiFillFolder size="18px" style={{ margin: '0 2px 0 0' }} />
                </>
              )}
            </div>
          </>
        )}

        <span
          className="node-text"
          onClick={() => onNodeClick(node)}
          onDoubleClick={(e: React.MouseEvent<HTMLSpanElement>) => {
            e.preventDefault();
            node.edit();
          }}
        >
          {node.isEditing ? (
            <input
              type="text"
              defaultValue={node.data.name}
              onFocus={e => e.currentTarget.select()}
              onBlur={() => {
                if (isCorrectName(node.data.name) === true) {
                  handleCreateFileRequest(node.data, node.data.name);
                  updateNodeName(node.id, node.data.name);
                  node.submit(node.data.name);
                } else {
                  node.reset();
                  tree.delete(node.id);
                }
              }}
              onKeyDown={(e: React.KeyboardEvent<HTMLInputElement>) => {
                if (e.key === 'Escape') node.reset();
                if (e.key === 'Enter') {
                  if (isCorrectName(e.currentTarget.value) === true) {
                    onCreateFile(e.currentTarget.value);
                    updateNodeName(node.id, e.currentTarget.value);
                    node.submit(e.currentTarget.value);
                  } else {
                    node.reset();
                    tree.delete(node.id);
                  }
                }
              }}
              autoFocus
            />
          ) : (
            <span>{node.data.name}</span>
          )}
        </span>
      </FileDiv>

      <div className="file-actions">
        <div className="folderFileActions">
          <button onClick={() => node.edit()} title="Rename...">
            <MdEdit />
          </button>
          <button onClick={onDeleteFile} title="Delete">
            <RxCross2 />
          </button>
        </div>
      </div>
    </NodeContainer>
  );
};
