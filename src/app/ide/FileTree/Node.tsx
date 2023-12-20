import { AiFillFolder, AiFillFolderOpen, AiOutlineFile } from 'react-icons/ai';
import { NodeRendererProps } from 'react-arborist';
import { MdArrowRight, MdArrowDropDown } from 'react-icons/md';
import { MdEdit } from 'react-icons/md';
import { RxCross2 } from 'react-icons/rx';
import { FileDiv, NodeContainer } from './FileTree.styles';
import React from 'react';
import axiosInstance from '@/app/api/axiosInstance';
import { findNowFilePath } from '@/utils/fileTreeUtils';
import { useFileTreeStore } from '@/store/useFileTreeStore';
import { FileNodeType } from '@/types/IDE/FileTree/FileDataTypes';
import { useFileStore } from '@/store/useFileStore';
import useCurrentOpenFileList from '@/store/useCurrentOpenFile';

export const Node = ({
  node,
  style,
  dragHandle,
  tree,
}: NodeRendererProps<FileNodeType>) => {
  const { updateNodeName } = useFileTreeStore();
  const { setContent } = useFileStore();
  const { setOpenFilesIdList } = useCurrentOpenFileList();

  const handleOpenFile = async () => {
    try {
      const nowFilePath = findNowFilePath(node);

      const { data } = await axiosInstance.post('/api/files', {
        //여기에 현재 파일 경로 보내기
        //그리고 생성한 프로젝트 아이디 담아 보내기
        name: nowFilePath,
        description: 'description',
        programmingLanguage: 'PYTHON',
        password: 'password',
      });

      //응답받은 filename, content 담아두기
      setContent('print("testPython"))');

      //열린 파일 목록 업데이트
      setOpenFilesIdList(node.id);

      return data;
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <NodeContainer className="node-container" style={style} ref={dragHandle}>
      <FileDiv
        className="node-content"
        onClick={() => node.isInternal && node.toggle()}
      >
        {node.isLeaf ? (
          <>
            <AiOutlineFile size="18px" style={{ margin: '0 2px 0 16px' }} />
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
          onClick={handleOpenFile}
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
              onBlur={() => node.reset()}
              onKeyDown={(e: React.KeyboardEvent<HTMLInputElement>) => {
                if (e.key === 'Escape') node.reset();
                if (e.key === 'Enter') {
                  updateNodeName(node.id, e.currentTarget.value);
                  node.submit(e.currentTarget.value); //이때 서버로도 메시지 보내야 함
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
          <button
            onClick={() => {
              tree.delete(node.id);
            }}
            title="Delete"
          >
            <RxCross2 />
          </button>
        </div>
      </div>
    </NodeContainer>
  );
};
