import { create } from 'zustand';
import { FileNodeType } from '@/types/IDE/FileTree/FileDataTypes';

const data: FileNodeType[] = [
  {
    id: '1',
    name: 'test',
    children: [{ id: 'c1-1', name: 'test.html' }],
  },
  {
    id: '2',
    name: 'src',
    children: [
      { id: 'c2-1', name: 'App.js' },
      { id: 'c2-2', name: 'index.js' },
      { id: 'c2-3', name: 'styles.css' },
    ],
  },
  { id: '3', name: 'package.json' },
  { id: '4', name: 'README.md' },
];

interface FileTreeState {
  fileTree: FileNodeType[];
  setFileTree: (fileTree: FileNodeType[]) => void;
  updateNodeName: (nodeId: string, newName: string) => void;
  addNode: (newNode: FileNodeType, parentId: string | null) => void;
}

export const useFileTreeStore = create<FileTreeState>(set => ({
  fileTree: data,
  setFileTree: fileTree => set({ fileTree }),
  updateNodeName: (nodeId, newName) =>
    set(state => ({
      fileTree: state.fileTree.map(node => {
        return node.id === nodeId ? { ...node, name: newName } : node;
      }),
    })),
  addNode: newNode =>
    set(state => ({
      fileTree: [...state.fileTree, newNode],
    })),
}));
