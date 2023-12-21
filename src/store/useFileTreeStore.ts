import { create } from 'zustand';
import { FileNodeType } from '@/types/IDE/FileTree/FileDataTypes';
import { removeNodeById } from '@/utils/fileTreeUtils';

const data: FileNodeType[] = [
  {
    id: '1',
    name: 'hello.py',
    content: 'print("hello python")',
    isDirty: false,
    isOpened: true,
    language: 'python',
  },
];

interface FileTreeState {
  file: FileNodeType | null;
  fileTree: FileNodeType[];
  setFileTree: (fileTree: FileNodeType[]) => void;
  updateNodeName: (nodeId: string, newName: string) => void;
  addNode: (newNode: FileNodeType, parentId?: string | null) => void;
  deleteNode: (nodeids: string | null) => void;
}

export const useFileTreeStore = create<FileTreeState>(set => ({
  file: null,
  fileTree: data,
  setFileTree: fileTree => set({ fileTree }),
  updateNodeName: (nodeId, newName) =>
    set(state => ({
      fileTree: state.fileTree.map(node => {
        return node.id === nodeId ? { ...node, name: newName } : node;
      }),
    })),
  addNode: (newNode: FileNodeType, parentId?: string | null) =>
    set(state => {
      const addNodeToTree = (nodes: FileNodeType[]): FileNodeType[] =>
        nodes.map(node => {
          if (node.id === parentId) {
            return {
              ...node,
              children: [...(node.children || []), newNode],
            };
          } else {
            return {
              ...node,
              children: node.children
                ? addNodeToTree(node.children)
                : node.children,
            };
          }
        });
      return {
        fileTree: parentId
          ? addNodeToTree(state.fileTree)
          : [...state.fileTree, newNode],
      };
    }),
  deleteNode: nodeId =>
    set(state => ({
      fileTree: removeNodeById(state.fileTree, nodeId),
    })),
}));
