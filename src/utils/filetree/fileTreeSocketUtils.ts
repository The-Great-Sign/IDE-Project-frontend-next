import { FileSocketReceivedType } from '@/app/api/websocket';
import { FileNodeType } from '@/types/IDE/FileTree/FileDataTypes';
import { removeNodeById } from './fileTreeUtils';
import { findNodeIdByPath } from './findNodeUtils';

//웹소켓 핸들러
export const processWebSocketFileEvent = (
  fileTree: FileNodeType[],
  fileData: FileSocketReceivedType
): FileNodeType[] => {
  const { fileId, event, path, type } = fileData;

  if (event === 'CREATE') {
    // CREATE 이벤트 처리 로직
    // 부모 디렉토리의 경로를 바탕으로 부모 노드 ID 찾기
    const parentPath = path.substring(0, path.lastIndexOf('/'));
    const parentNodeId = findNodeIdByPath(fileTree, parentPath);

    // 새 파일 노드 생성
    const newNode: FileNodeType = {
      //여기서 id를 서버 응답으로 설정
      id: String(fileId),
      name: path.split('/').pop() || '',
      type: type === 'DIRECTORY' ? 'DIRECTORY' : 'FILE',
      children: type === 'DIRECTORY' ? [] : undefined,
      parentId: parentNodeId,
      isDirty: false,
      filePath: parentPath + '/' + name,
    };
    console.log(newNode);

    // 파일 트리에 노드 추가
    return addNodeToTreeWebSocket(fileTree, newNode, parentNodeId);
  } else if (event === 'DELETE') {
    // DELETE 이벤트 처리 로직
    const nodeId = findNodeIdByPath(fileTree, path);
    if (!nodeId) return fileTree;

    return removeNodeById(fileTree, nodeId);
  }

  return fileTree;
};

//웹소켓을 통해 노드 추가하기
const addNodeToTreeWebSocket = (
  nodes: FileNodeType[],
  newNode: FileNodeType,
  parentId?: string | null
): FileNodeType[] => {
  if (!parentId) {
    return [...nodes, newNode];
  }

  return nodes.map(node => {
    if (node.id === parentId) {
      return {
        ...node,
        children: node.children ? [...node.children, newNode] : [newNode],
      };
    }

    return node.children
      ? {
          ...node,
          children: addNodeToTreeWebSocket(node.children, newNode, parentId),
        }
      : node;
  });
};
