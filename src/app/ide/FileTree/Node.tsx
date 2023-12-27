import React from 'react';
import { AiFillFolder, AiFillFolderOpen } from 'react-icons/ai';
import { MdArrowRight, MdArrowDropDown, MdEdit } from 'react-icons/md';
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

  //파일 삭제 버튼 클릭 시 바로 실행되는 로직
  const onDeleteFile = async () => {
    try {
      const success = await handleDeleteFileRequest(node.data);

      if (success) {
        // 서버에서 받아온 파일 id 값으로 바꾸기
        const roomId = node.id;
        const response = await axiosInstance.delete(
          `/api/live-blocks/rooms/file-${roomId}`
        );
        console.log(response);
        tree.delete(node.id);
        alert('삭제 성공');
      } else {
        alert('라이브블록 : 파일 삭제에 문제가 있습니다.');
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
  const onInputComplete = (newName: string) => {
    handleFileOpenAndUpdate(node.id, newName);
  };

  //enter or blur 클릭 시 서버 및 파일트리 렌더링 처리
  const handleFileAdd = (fileId: string, newName: string) => {
    if (isCorrectName(newName) === true) {
      onCreateFile(newName);
      updateNodeName(fileId, newName);
      node.submit(newName); //이때 서버로도 메시지 보내야 함
      onInputComplete(newName);
    } else {
      node.reset();
      tree.delete(node.id);
    }
  };

  return (
    <>
      <NodeContainer className="node-container" style={style} ref={dragHandle}>
        <FileDiv
          className="node-content"
          onClick={() =>
            node.isInternal
              ? node.toggle()
              : handleFileOpenAndUpdate(node.id, node.data.name)
          }
          isNodeDirty={node.data.isDirty}
        >
          {node.data.type === 'FILE' ? (
            <>
              {node.data.isDirty ? <IsDirty /> : <IsNotDirty />}
              <LanguageIcon
                language={findLanguage(
                  String(node.data.name.split('.').at(-1))
                )}
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

          {/* node text */}
          <span
            className="node-text"
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
    </>
  );
};
