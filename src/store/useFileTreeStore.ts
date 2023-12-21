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
    children: [
      {
        id: '2',
        name: 'hello2.py',
        content: 'print("hello python2")',
        isDirty: false,
        isOpened: true,
        language: 'python',
      },
      {
        id: '3',
        name: 'hello3.py',
        content: 'print("hello python3")',
        isDirty: false,
        isOpened: true,
        language: 'python',
        children: [
          {
            id: '4',
            name: 'hello4.py',
            content: 'print("hello python4")',
            isDirty: false,
            isOpened: true,
            language: 'python',
            children: [
              {
                id: 'sdfs5',
                name: 'hello5.py',
                content: 'print("hello python2")',
                isDirty: false,
                isOpened: true,
                language: 'python',
              },
              {
                id: '32342',
                name: 'hello6.py',
                content: 'print("hello python3")',
                isDirty: false,
                isOpened: true,
                language: 'python',
                children: [
                  {
                    id: '4234234',
                    name: 'hello7.py',
                    content: 'print("hello python4")',
                    isDirty: false,
                    isOpened: true,
                    language: 'python',
                  },
                ],
              },
            ],
          },
        ],
      },
    ],
  },
  {
    id: '5',
    name: 'hell55o.py',
    content: 'print("hello55 python")',
    isDirty: true,
    isOpened: true,
    language: 'python',
  },
];

interface FileTreeState {
  file: FileNodeType | null;
  fileTree: FileNodeType[];
  setFileTree: (fileTree: FileNodeType[]) => void;
  updateNodeName: (nodeId: string, newName: string) => void;
  addNode: (newNode: FileNodeType, parentId: string | null) => void;
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
  addNode: (newNode: FileNodeType, parentId: string | null) =>
    set(state => {
      const addNodeToTree = (nodes: FileNodeType[]): FileNodeType[] =>
        nodes.map(node =>
          node.id === parentId
            ? { ...node, children: [...(node.children || []), newNode] }
            : {
                ...node,
                children: node.children ? addNodeToTree(node.children) : [],
              }
        );

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
