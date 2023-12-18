import { AiFillFolderOpen, AiOutlineFile } from 'react-icons/ai';
import { NodeRendererProps } from 'react-arborist';
import { MdArrowRight, MdArrowDropDown } from 'react-icons/md';
import { MdEdit } from 'react-icons/md';
import { RxCross2 } from 'react-icons/rx';
import { FileDiv, NodeContainer } from './FileTree.styles';
import { NodeData } from '@/types/IDE/FileTree/FileDataTypes';
import React, { useState } from 'react';
import axiosInstance from '@/app/api/axiosInstance';
import useCurrentOpenFile from '@/store/useCurrentOpenFile';
import { findNowFilePath } from '@/utils/fileTreeUtils';

export const Node = ({
  node,
  style,
  dragHandle,
  tree,
}: NodeRendererProps<NodeData>) => {
  const [nowFilePath, setNowFilePath] = useState<string>('');

  const handleOpenFile = async () => {
    try {
      setNowFilePath(findNowFilePath(node));
      const { data } = await axiosInstance.post('/api/projects', {
        //여기에 현재 파일 경로 보내기
        //그리고 생성한 프로젝트 아이디 담아 보내기
        name: { nowFilePath },
        description: 'description',
        programmingLanguage: 'PYTHON',
        password: 'password',
      });

      //응답받은 filename, content 담아두기
      useCurrentOpenFile.getState().setFiles(data.files);
      useCurrentOpenFile.getState().setContent(data.content);

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
            <AiOutlineFile size="18px" />
          </>
        ) : (
          <>
            <span style={{ margin: '0px 3px' }}>
              {node.isOpen ? <MdArrowDropDown /> : <MdArrowRight />}
            </span>
            <AiFillFolderOpen size="18px" />
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
                if (e.key === 'Enter') node.submit(e.currentTarget.value); //이때 서버로도 메시지 보내야 함
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
          <button onClick={() => tree.delete(node.id)} title="Delete">
            <RxCross2 />
          </button>
        </div>
      </div>
    </NodeContainer>
  );
};
