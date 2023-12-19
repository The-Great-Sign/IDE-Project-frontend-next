import {
  CreateFileDiv,
  FileButton,
  FileTreeConatiner,
} from './FileTree.styles';
import {
  CreateHandler,
  NodeRendererProps,
  Tree,
  TreeApi,
} from 'react-arborist';
import { Node } from './Node';
import { Resizable } from 're-resizable';
import { AiOutlineFileAdd, AiOutlineFolderAdd } from 'react-icons/ai';
import { useFileTreeStore } from '@/store/useFileTreeStore';
import { FileNodeType } from '@/types/IDE/FileTree/FileDataTypes';
import { useRef } from 'react';
import { useTreeNodeStore } from '@/store/useTreeNodeStroe';
import { v4 as uuidv4 } from 'uuid';

const FileTree = () => {
  const { fileTree, setFileTree } = useFileTreeStore();
  const newNodeName = useTreeNodeStore(state => state.newNodeName);

  const treeRef = useRef<TreeApi<FileNodeType>>(null);
  const { addNode } = useFileTreeStore();

  const onCreate: CreateHandler<FileNodeType> = ({ parentId, type, index }) => {
    const newUUID = uuidv4();
    const newNode: FileNodeType = {
      id: `${index}-${newUUID}`,
      name: newNodeName,
      ...(type === 'internal' && { children: [] }),
    };

    addNode(newNode, parentId);
    const newFileTree = [...fileTree, newNode];
    setFileTree(newFileTree);

    return newNode;
  };

  return (
    <Resizable
      defaultSize={{
        width: '330px',
        height: '100%', // 초기 높이 설정
      }}
      enable={{
        top: false, // 위쪽으로만 리사이징 가능
        right: true,
        bottom: false,
        left: false,
        topRight: true,
        bottomRight: false,
        bottomLeft: false,
        topLeft: false,
      }}
    >
      <FileTreeConatiner>
        <CreateFileDiv>
          <FileButton
            onClick={() => treeRef.current?.createLeaf()}
            title="New File..."
          >
            <AiOutlineFileAdd size="22px" />
          </FileButton>
          <FileButton
            onClick={() => treeRef.current?.createInternal()}
            title="New Folder..."
          >
            <AiOutlineFolderAdd size="22px" />
          </FileButton>
        </CreateFileDiv>
        <Tree
          className="react-aborist"
          onCreate={onCreate}
          ref={treeRef}
          data={fileTree}
        >
          {nodeProps => (
            <Node {...(nodeProps as NodeRendererProps<FileNodeType>)} />
          )}
        </Tree>
      </FileTreeConatiner>
    </Resizable>
  );
};

export default FileTree;
