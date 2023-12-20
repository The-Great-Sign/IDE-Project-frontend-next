import { useFileStore } from '@/store/useFileStore';
import { FileNodeType } from '@/types/IDE/FileTree/FileDataTypes';
import { NodeApi } from 'react-arborist';

export const findNowFilePath = (node: NodeApi<FileNodeType> | null) => {
  let filePath = '';
  while (node!.data.id !== '__REACT_ARBORIST_INTERNAL_ROOT__') {
    const newFile = '/' + node!.data.name;
    filePath = newFile + filePath;
    if (node) {
      node = node.parent;
    }
  }
  useFileStore.getState().setFilePath(filePath);

  return filePath;
};

export const removeNodeById = (
  nodes: FileNodeType[],
  nodeId: string | null
) => {
  return nodes.reduce((acc: FileNodeType[], node: FileNodeType) => {
    if (node.id !== nodeId) {
      const newNode = { ...node };
      if (node.children) {
        newNode.children = removeNodeById(node.children, nodeId);
      }
      acc.push(newNode);
    }
    return acc;
  }, []);
};
