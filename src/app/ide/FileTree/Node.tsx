import React from 'react';
import { AiFillFolder, AiFillFolderOpen } from 'react-icons/ai';
import { MdArrowRight, MdArrowDropDown } from 'react-icons/md';
import { RxCross2 } from 'react-icons/rx';
import { NodeRendererProps } from 'react-arborist';
import { FileDiv, IsDirty, IsNotDirty, NodeContainer } from './FileTree.styles';
import { useFileTreeStore } from '@/store/useFileTreeStore';
import { FileNodeType } from '@/types/IDE/FileTree/FileDataTypes';
import { findLanguage } from '@/utils/filetree/findFileLangUtils';
import { isCorrectName } from '@/utils/filetree/fileTreeUtils';
import useHandleOpenFile from '@/hooks/useHandleOpenFile';
import LanguageIcon from './LanguageIcon';
import useHandleCreateFile from '@/hooks/useHandleCreateFile';
import useHandleDeleteFileRequest from '@/hooks/useHandleDeleteFile';
import axiosInstance from '@/app/api/axiosInstance';
import { useContextMenuStore } from '@/store/useContextMenuStore';

export const Node = ({
  node,
  style,
  dragHandle,
  tree,
}: NodeRendererProps<FileNodeType>) => {
  const { updateNodeName } = useFileTreeStore();
  const handleOpenFile = useHandleOpenFile();
  const handleCreateFileRequest = useHandleCreateFile();
  const handleDeleteFileRequest = useHandleDeleteFileRequest();

  //파일 생성 버튼 클릭 시 바로 실행되는 로직
  const handleCreateFile = async (newNodeName: string) => {
    const fileNode = {
      ...node.data,
      name: newNodeName,
    };

    await handleCreateFileRequest(fileNode as FileNodeType, newNodeName);

    if (node.data.name === '') {
      useFileTreeStore.getState().deleteNode(node.id);
    }
  };

  //파일 삭제 버튼 클릭 시 바로 실행되는 로직
  const handleDeleteFile = async () => {
    try {
      const success = await handleDeleteFileRequest(node.data);

      if (success) {
        tree.delete(node.id);
        alert('삭제 성공');

        // 30초 후에 Liveblocks와 room 관련 처리 실행
        setTimeout(async () => {
          const roomId = node.id;
          try {
            const response = await axiosInstance.delete(
              `/api/live-blocks/rooms/file-${roomId}`
            );
            console.log('Liveblocks room 삭제 성공', response);
          } catch (error) {
            console.error('Liveblocks room 삭제 중 오류 발생', error);
          }
        }, 30000);
      }
    } catch (error) {
      console.error('Error deleting file:', error);
      alert('파일트리 : 파일 삭제 중 오류가 발생했습니다.');
    }
  };

  // 파일 열기 및 이름 업데이트 처리
  const handleFileOpenAndUpdate = (fileId: string, newName: string) => {
    const language = findLanguage(newName.split('.').at(-1) || 'python');
    handleOpenFile(fileId, newName, language);
  };

  // 파일 이름 입력 완료 처리
  const handleInputComplete = (newName: string) => {
    handleFileOpenAndUpdate(node.id, newName);
  };

  //enter or blur 클릭 시 서버 및 파일트리 렌더링 처리
  const handleFileAdd = (fileId: string, newName: string) => {
    if (isCorrectName(newName) === true) {
      handleCreateFile(newName);
      updateNodeName(fileId, newName);
      node.submit(newName); //이때 서버로도 메시지 보내야 함
      handleInputComplete(newName);
    } else {
      node.reset();
      tree.delete(node.id);
    }
  };

  const renderFolderIcon = () =>
    node.isOpen ? (
      <>
        <MdArrowDropDown />
        <AiFillFolderOpen size="18px" style={{ margin: '0 2px 0 0 ' }} />
      </>
    ) : (
      <>
        <MdArrowRight />
        <AiFillFolder size="18px" style={{ margin: '0 2px 0 0' }} />
      </>
    );

  const renderFileIcon = () => (
    <>
      {node.data.isDirty ? <IsDirty /> : <IsNotDirty />}
      <LanguageIcon
        language={findLanguage(String(node.data.name.split('.').at(-1)))}
      />
    </>
  );

  const renderNodeContent = () =>
    node.isEditing ? (
      <input
        type="text"
        defaultValue={node.data.name}
        onFocus={e => e.currentTarget.select()}
        onBlur={() => {
          handleFileAdd(node.id, node.data.name);
        }}
        onKeyDown={(e: React.KeyboardEvent<HTMLInputElement>) => {
          if (e.key === 'Escape') node.reset();
          if (e.key === 'Enter') {
            handleFileAdd(node.id, e.currentTarget.value);
          }
        }}
        autoFocus
      />
    ) : (
      <span>{node.data.name}</span>
    );

  return (
    <>
      <NodeContainer
        className="node-container"
        style={style}
        ref={dragHandle}
        onMouseOver={() => useContextMenuStore.getState().setHoveredId(node.id)}
      >
        <FileDiv
          className="node-content"
          onClick={(e: React.MouseEvent) => {
            e.preventDefault();
            node.isInternal
              ? node.toggle()
              : handleFileOpenAndUpdate(node.id, node.data.name);
          }}
        >
          {node.data.type === 'FILE' ? (
            renderFileIcon()
          ) : (
            <div style={{ display: 'flex', justifyContent: 'center' }}>
              {renderFolderIcon()}
            </div>
          )}

          <span
            className="node-text"
            onDoubleClick={(e: React.MouseEvent<HTMLSpanElement>) => {
              e.preventDefault();
              node.edit();
            }}
          >
            {renderNodeContent()}
          </span>
        </FileDiv>

        <div className="file-actions">
          <div className="folderFileActions">
            <button onClick={handleDeleteFile} title="Delete">
              <RxCross2 />
            </button>
          </div>
        </div>
      </NodeContainer>
    </>
  );
};
