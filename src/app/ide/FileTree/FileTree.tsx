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

const FileTree = () => {
  const { fileTree, deleteNode, addNode, findNodePathByName } =
    useFileTreeStore();
  const projectId = getCurrentProjectId();
  const [projectName, setProjectName] = useState<string>('');

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
      parentId: parentId,
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
      </FileTreeConatiner>
    </Resizable>
  );
};

export default FileTree;
