import {
  CreateFileDiv,
  FileButton,
  FileTreeConatiner,
  ProjectName,
  StyledContextMenu,
  StyledContextMenuItem,
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
import {
  findNodeById,
  findNodeByIdWithoutP,
} from '@/utils/filetree/findNodeUtils';
import axiosInstance from '@/app/api/axiosInstance';

import { ContextMenuTrigger } from 'rctx-contextmenu';
import { useContextMenuStore } from '@/store/useContextMenuStore';
import useHandleDeleteFileRequest from '@/hooks/useHandleDeleteFile';
import { fetchProjectName } from '@/app/api/filetree/fetchProjectName';
import { moveFile } from '@/app/api/filetree/moveFile';

const FileTree = () => {
  const treeRef = useRef<TreeApi<FileNodeType>>(null);
  const handleDeleteFileRequest = useHandleDeleteFileRequest();

  const [projectName, setProjectName] = useState<string>('');
  const { fileTree, deleteNode, addNode, findNodePathByName } =
    useFileTreeStore();

  useEffect(() => {
    renderProjectName();
  });

  const renderProjectName = async () => {
    try {
      const data = await fetchProjectName();
      if (data.success) {
        setProjectName(data.results.name);
      } else {
        alert(data.message);
      }
    } catch (error) {
      console.error(error);
    }
  };

  //파일 또는 폴더 생성 클릭 시 동작
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

  //파일 또는 폴더 삭제 시 동작
  const onDelete: DeleteHandler<FileNodeType> = ({ ids }) => {
    deleteNode(ids[0]);
  };

  //파일 드래그 앤 드랍 시 동작 -> 백엔드 미지원
  const onMove: MoveHandler<FileNodeType> = ({ dragIds, parentId }) => {
    const nowFileTree = useFileTreeStore.getState().fileTree;
    const state = useFileTreeStore.getState();
    const { node, befParentId } = findNodeById(nowFileTree, dragIds[0], '/');

    moveFile(node, parentId, befParentId, state, dragIds);
  };

  //context menu로 파일 삭제
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
      <StyledContextMenu id="my-context-menu-1">
        <StyledContextMenuItem onClick={handleDeleteFile}>
          삭제하기
        </StyledContextMenuItem>
      </StyledContextMenu>
    </Resizable>
  );
};

export default FileTree;
