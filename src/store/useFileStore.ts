import { create } from 'zustand';

interface FileState {
  id: string | null;
  name: string | null;
  isDirty?: boolean;
  isOpened?: boolean;
  language?: string;
  filePath?: string | null;
  content?: string | null;
  setFilePath: (name: string) => void;
  setToggleDirty: () => void;
  setToggleOpen: () => void;
  setLanguage: (lang: string) => void;
  setContent: (content: string) => void;
}

export const useFileStore = create<FileState>(set => ({
  id: null,
  name: null,
  isDirty: false,
  isOpened: false,
  language: 'python',
  filePath: null,
  content: null,
  setFilePath: (name: string) =>
    set({
      //해당 노드 찾아서 filePath 변경
      filePath: name,
    }),
  setToggleDirty: () =>
    set(state => ({
      isDirty: !state.isDirty,
    })),
  setToggleOpen: () =>
    set(state => ({
      isOpened: !state.isOpened,
    })),
  setLanguage: (lang: string) => set({ language: lang }),
  setContent: (content: string) => set({ content: content }),
}));
