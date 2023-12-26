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

import axiosInstance from '@/app/api/axiosInstance';
import useProjectStore from '@/store/useProjectStore';
import { findNodeById } from '@/utils/filetree/findNodeUtils';
import { Button } from '@mui/material';

const FileTree = () => {
  const projectId = useProjectStore.getState().currentProject.id;

  const treeRef = useRef<TreeApi<FileNodeType>>(null);

  const onCreate: CreateHandler<FileNodeType> = ({ type, parentId }) => {
    const newNode: FileNodeType = {
      id: uuidv4(),
      name: '',
      type: type === 'internal' ? 'DIRECTORY' : 'FILE',
      ...(type === 'internal' && { children: [] }),
      isDirty: false,
      isOpened: true,
      filePath: useFileTreeStore.getState().findNodePathByName(''),
      parentId: parentId,
    };

    useFileTreeStore.getState().addNode(newNode, parentId);

    return newNode;
  };

  const onDelete: DeleteHandler<FileNodeType> = ({ ids }) => {
    useFileTreeStore.getState().deleteNode(ids[0]);
  };

  const onMove: MoveHandler<FileNodeType> = ({ dragIds, parentId }) => {
    const nowFileTree = useFileTreeStore.getState().fileTree;
    const state = useFileTreeStore.getState();
    const { node, befParentId } = findNodeById(nowFileTree, dragIds[0], '/');

    const moveFile = async () => {
      try {
        let findParentPath;

        if (node?.type === 'FILE' && befParentId !== parentId) {
          const nowFilePath = state.findNodePath(node.id);

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
            content: '',
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
        height: '100%',
      }}
      enable={{
        top: false,
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
          data={useFileTreeStore.getState().fileTree}
        >
          {nodeProps => (
            <Node {...(nodeProps as NodeRendererProps<FileNodeType>)} />
          )}
        </Tree>
        <Button>버튼</Button>
      </FileTreeConatiner>
    </Resizable>
  );
};

export default FileTree;
