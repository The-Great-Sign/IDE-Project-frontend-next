import { create } from 'zustand';
import * as Y from 'yjs';

interface File {
  id: string;
  name: string;
  content: string;
  language: string;
  yDoc: Y.Doc;
  isOpened: boolean;
}

interface FileState {
  files: File[];
  selectedFileId: string | null;
  openFile: (fileId: string, name: string, language: string) => void;
  closeFile: (fileId: string) => void;
  selectFile: (fileId: string) => void;
}

export const useFileStore = create<FileState>(set => ({
  files: [],
  selectedFileId: null,
  openFile: (fileId, name, language) => {
    const yDoc = new Y.Doc();
    set(state => {
      if (state.files.some(f => f.id === fileId)) {
        // File is already opened, so no need to add again
        return { ...state };
      }
      return {
        ...state,
        files: [
          ...state.files,
          { id: fileId, name, content: '', language, yDoc, isOpened: true },
        ],
      };
    });
  },
  closeFile: fileId => {
    set(state => ({
      files: state.files.filter(file => file.id !== fileId),
      selectedFileId:
        state.selectedFileId === fileId ? null : state.selectedFileId,
    }));
  },
  selectFile: fileId => {
    set({ selectedFileId: fileId });
  },
}));
