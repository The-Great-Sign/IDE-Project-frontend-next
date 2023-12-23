// useFileStore.ts
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
  openFile: (
    fileId: string,
    name: string,
    language: string
    // content: string
  ) => void;
  closeFile: (fileId: string) => void;
  selectFile: (fileId: string) => void;
  updateFileName: (fileId: string, newName: string) => void;
}

export const useFileStore = create<FileState>(set => ({
  files: [],
  selectedFileId: null,
  openFile: (fileId, name, language, content = '') => {
    set(state => {
      const existingFile = state.files.find(f => f.id === fileId);
      if (existingFile) {
        return { ...state, selectedFileId: fileId };
      }
      const yDoc = new Y.Doc();
      const newFile = {
        id: fileId,
        name,
        content,
        language,
        yDoc,
        isOpened: true,
      };
      return {
        files: [...state.files, newFile],
        selectedFileId: fileId,
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
  updateFileName: (fileId, newName) => {
    set(state => ({
      files: state.files.map(file =>
        file.id === fileId ? { ...file, name: newName } : file
      ),
    }));
  },
}));
