import { create } from 'zustand';

interface CurrentOpenFileState {
  directories: string | null;
  files: string | null;
  content: string | null;
  language: string | null;
  setFiles: (filePath: string | null) => void;
  setContent: (content: string | null) => void;
}
const useCurrentOpenFile = create<CurrentOpenFileState>(set => ({
  directories: null,
  files: null,
  content: null,
  language: null,
  setFiles: filePath => set({ files: filePath }),
  setContent: newContent => set({ content: newContent }),
}));

export default useCurrentOpenFile;
