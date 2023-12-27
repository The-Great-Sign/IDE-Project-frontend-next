import { FileNodeType } from '@/types/IDE/FileTree/FileDataTypes';

export interface ServerNode {
  id: string;
  name: string;
  type: 'FILE' | 'DIRECTORY';
  children?: ServerNode[];
  path: string;
}

export interface ServerResponse {
  results: ServerNode[];
}

export const transformToFileNodeType = (
  nodes: ServerNode[]
): FileNodeType[] => {
  return nodes.map(node => {
    const fileNode: FileNodeType = {
      id: node.id,
      name: node.name,
      type: node.type,
      isDirty: false,
      isOpened: false,
      filePath: node.path,
      parentId: node.id,
      ...(node.type === 'DIRECTORY' &&
        node.children && { children: transformToFileNodeType(node.children) }),
    };

    return fileNode;
  });
};
