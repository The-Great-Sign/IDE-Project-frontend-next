import {
  CreateFileDiv,
  FileButton,
  FileTreeConatiner,
} from './FileTree.styles';
import {
  CreateHandler,
  DeleteHandler,
  MoveHandler,
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
import { findNodeById } from '@/utils/fileTreeUtils';

import axiosInstance from '@/app/api/axiosInstance';

const FileTree = () => {
  const { fileTree, setFileTree, deleteNode, addNode } = useFileTreeStore();
  // const projectId = '900feca1-b386-4c24-bdbf-8b4aa64c8b24';

  const treeRef = useRef<TreeApi<FileNodeType>>(null);

  const onCreate: CreateHandler<FileNodeType> = ({ type, index }) => {
    const newUUID = uuidv4();

    const newNode: FileNodeType = {
      id: `${index}-${newUUID}`,
      name: '',
      isFile: type !== 'internal',
      ...(type === 'internal' && { children: [] }),
      isDirty: false,
      isOpened: true,
    };

    const newParent = treeRef.current?.focusedNode?.id;
    addNode(newNode, newParent);

    const newFileTree = [...fileTree, newNode];
    setFileTree(newFileTree);

    return newNode;
  };

  const onDelete: DeleteHandler<FileNodeType> = ({ ids }) => {
    deleteNode(ids[0]);
  };

  const onMove: MoveHandler<FileNodeType> = ({ dragIds, parentId }) => {
    const nowFileTree = useFileTreeStore.getState().fileTree;
    const state = useFileTreeStore.getState();
    const { node, befParentId } = findNodeById(nowFileTree, dragIds[0], '/');

    const moveFile = async () => {
      try {
        let findParentPath;

        if (node?.isFile && befParentId !== parentId) {
          const nowFilePath = state.findNodePath(node.id);

          const projectId = '900feca1-b386-4c24-bdbf-8b4aa64c8b24';

          const response = await axiosInstance.delete('/api/files', {
            data: { projectId: projectId, path: nowFilePath },
          });

          dragIds.forEach((id: string) =>
            useFileTreeStore.getState().deleteNode(id)
          );

          const newNode = node;
          newNode.id = uuidv4();

          useFileTreeStore.getState().addNode(node, parentId);
          if (parentId) {
            findParentPath = state.findNodePath(parentId) + '/' + node.name;
          } else {
            findParentPath = '/' + node.name;
          }

          const response2 = await axiosInstance.post('/api/files', {
            projectId: projectId,
            directories: null,
            files: findParentPath,
            content: 'print("Hello, World!")',
          });

          console.log(response2);

          return response;
        }
      } catch (error) {
        console.error('Error deleting file:', error);
        alert('파일 삭제 중 오류가 발생했습니다.');
      }
    };
    moveFile();
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
          onMove={onMove}
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
