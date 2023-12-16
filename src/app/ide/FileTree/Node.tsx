import { AiFillFolderOpen, AiOutlineFile } from 'react-icons/ai';
import { NodeRendererProps } from 'react-arborist';
import { MdArrowRight, MdArrowDropDown } from 'react-icons/md';
import { MdEdit } from 'react-icons/md';
import { RxCross2 } from 'react-icons/rx';
import { FileDiv, NodeContainer } from './FileTree.styles';
import { NodeData } from '@/types/IDE/FileTree/FileDataTypes';
import React from 'react';

export const Node = ({
  node,
  style,
  dragHandle,
  tree,
}: NodeRendererProps<NodeData>) => {
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
