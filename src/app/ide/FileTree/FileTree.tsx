import {
  CreateFileDiv,
  FileButton,
  FileTreeConatiner,
} from './FileTree.styles';
import {
  CreateHandler,
  DeleteHandler,
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
import { v4 as uuidv4 } from 'uuid';

const FileTree = () => {
  const { fileTree, setFileTree, deleteNode, addNode } = useFileTreeStore();

  const treeRef = useRef<TreeApi<FileNodeType>>(null);

  const onCreate: CreateHandler<FileNodeType> = ({ parentId, type, index }) => {
    const newUUID = uuidv4();
    //새 노드 정의
    const newNode: FileNodeType = {
      id: `${index}-${newUUID}`,
      name: '',
      ...(type === 'internal' && { children: [] }),
      // language: newNodeName.split('.')[-1],
      isDirty: false,
      isOpened: true,
    };
    //노드 추가 시
    addNode(newNode, parentId);
    const newFileTree = [...fileTree, newNode];
    setFileTree(newFileTree);
    console.log(treeRef);

    //초기화

    return newNode;
  };

  const onDelete: DeleteHandler<FileNodeType> = ({ ids }) => {
    deleteNode(ids[0]);
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
            onClick={() => {
              treeRef.current?.createLeaf();
            }}
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
          onDelete={onDelete}
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
