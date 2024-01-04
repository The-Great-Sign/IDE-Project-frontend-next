import { create } from 'zustand';
import { FileNodeType } from '@/types/IDE/FileTree/FileDataTypes';
import { addNodeToTree, removeNodeById } from '@/utils/filetree/fileTreeUtils';
import { FileSocketReceivedType } from '@/app/api/websocket';

import { processWebSocketFileEvent } from '@/utils/filetree/fileTreeSocketUtils';
import {
  findFilePath,
  findFilePathByName,
} from '@/utils/filetree/findNodeUtils';

export interface FileTreeState {
  file: FileNodeType | null;
  fileTree: FileNodeType[];
  setFileTree: (fileTree: FileNodeType[]) => void;
  updateNodeName: (nodeId: string, newName: string) => void;
  addNode: (newNode: FileNodeType, parentId?: string | null) => void;
  deleteNode: (nodeids: string | null) => void;
  findNodePath: (nodeid: string | number | null) => string | null | number;
  findNodePathByName: (nodename: string) => string | null;
  handleWebSocketFileEvent: (fileData: FileSocketReceivedType) => void;
  isNewNode: boolean;
  setIsNewNode: (boolean: boolean) => void;
}

export const useFileTreeStore = create<FileTreeState>(set => ({
  file: null,
  fileTree: [],
  setFileTree: fileTree => set({ fileTree }),
  updateNodeName: (nodeId, newName) =>
    set(state => ({
      fileTree: state.fileTree.map(node => {
        return node.id === nodeId ? { ...node, name: newName } : node;
      }),
    })),
  addNode: (newNode: FileNodeType, parentId?: string | null) =>
    set(state => {
      return {
        fileTree: parentId
          ? addNodeToTree(state.fileTree, newNode, parentId)
          : [...state.fileTree, newNode],
      };
    }),

  deleteNode: nodeId =>
    set(state => ({
      fileTree: removeNodeById(state.fileTree, nodeId),
    })),

  findNodePath: (nodeid: string | number | null) => {
    const state: FileTreeState = useFileTreeStore.getState();
    return findFilePath(state.fileTree, nodeid);
  },
  findNodePathByName: (nodename: string) => {
    const state: FileTreeState = useFileTreeStore.getState();
    return findFilePathByName(state.fileTree, nodename);
  },

  handleWebSocketFileEvent: (fileData: FileSocketReceivedType) => {
    set(state => ({
      fileTree: processWebSocketFileEvent(state.fileTree, fileData),
    }));
  },
  isNewNode: false,
  setIsNewNode: isNewNode => set({ isNewNode }),
}));
