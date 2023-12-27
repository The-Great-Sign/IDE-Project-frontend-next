import {
  CreateFileDiv,
  FileButton,
  FileTreeConatiner,
  ProjectName,
  TopContainer,
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
import { useEffect, useRef, useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { findNodeById } from '@/utils/filetree/findNodeUtils';
import axiosInstance from '@/app/api/axiosInstance';
import { getCurrentProjectId } from '../[projectId]/page';
import {
  ContextMenu,
  ContextMenuItem,
  ContextMenuTrigger,
} from 'rctx-contextmenu';
import { useContextMenuStore } from '@/store/useContextMenuStore';
import useHandleDeleteFileRequest from '@/hooks/useHandleDeleteFile';

const FileTree = () => {
  const { fileTree, deleteNode, addNode, findNodePathByName } =
    useFileTreeStore();
  const projectId = getCurrentProjectId();
  const [projectName, setProjectName] = useState<string>('');

  const handleDeleteFileRequest = useHandleDeleteFileRequest();

  const treeRef = useRef<TreeApi<FileNodeType>>(null);

  const getProjectName = async () => {
    try {
      const response = await axiosInstance.get(
        `${
          process.env.NEXT_PUBLIC_BACKEND_URI
        }/api/projects/${getCurrentProjectId()}`,
        {
          headers: {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*',
            Authorization: localStorage.getItem('accessToken'),
          },
        }
      );
      const data = response.data;
      if (data.success) {
        setProjectName(data.results.name);
      } else {
        alert(data.message);
      }
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getProjectName();
  });

  const onCreate: CreateHandler<FileNodeType> = ({ type, parentId }) => {
    const newNode: FileNodeType = {
      id: uuidv4(),
      name: '',
      type: type === 'internal' ? 'DIRECTORY' : 'FILE',
      ...(type === 'internal' && { children: [] }),
      isDirty: false,
      isOpened: true,
      filePath: findNodePathByName(''),
      parentId: parentId === null ? 'root' : parentId,
    };

    addNode(newNode, parentId);

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
        //타입이 파일이고 같은 계층에 있지 않았을 때 움직일 수 있도록 한다.
        if (node && node.type === 'FILE' && befParentId !== parentId) {
          const nowFilePath = state.findNodePath(node.id);
          const response = await axiosInstance.delete('/api/files', {
            data: { projectId: projectId, path: nowFilePath },
          });

          //클라이언트 파일 트리에서 해당 노드 지우기
          dragIds.forEach((id: string) =>
            useFileTreeStore.getState().deleteNode(id)
          );

          //클라이언트 파일 트리에서 해당 노드 추가
          useFileTreeStore.getState().addNode(node, parentId);

          //해당 노드가 새로 생성될 경로 찾기
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

  const findNodeByIdWithoutP = (
    nodes: FileNodeType[],
    nodeId: string | null
  ): FileNodeType | null => {
    for (const node of nodes) {
      if (node.id === nodeId) {
        return node; // 찾은 노드 반환
      }
      if (node.children) {
        const foundNode = findNodeByIdWithoutP(node.children, nodeId);
        if (foundNode) {
          return foundNode; // 자식 노드에서 찾은 노드 반환
        }
      }
    }
    return null; // 노드를 찾지 못했을 경우 null 반환
  };

  const handleDeleteFile = async () => {
    try {
      let success;
      const deleteNodeId = useContextMenuStore.getState().hoveredId;
      const nowFileTree = useFileTreeStore.getState().fileTree;
      //nodeid로 node 찾기
      const nowNode = findNodeByIdWithoutP(nowFileTree, deleteNodeId);

      if (nowNode) {
        success = await handleDeleteFileRequest(nowNode);
      }

      if (success) {
        useFileTreeStore.getState().deleteNode(deleteNodeId);
        alert('삭제 성공');

        // 30초 후에 Liveblocks와 room 관련 처리 실행
        setTimeout(async () => {
          const roomId = deleteNodeId;
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
      minWidth={'180px'}
    >
      <FileTreeConatiner>
        <TopContainer>
          <ProjectName>
            <span>{projectName}</span>
          </ProjectName>
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
        </TopContainer>
        <ContextMenuTrigger id="my-context-menu-1">
          <Tree
            className="react-aborist"
            width={'100%'}
            paddingTop={20}
            rowHeight={24}
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
        </ContextMenuTrigger>
      </FileTreeConatiner>
      <ContextMenu id="my-context-menu-1">
        <ContextMenuItem onClick={handleDeleteFile}>삭제하기</ContextMenuItem>
      </ContextMenu>
    </Resizable>
  );
};

export default FileTree;
