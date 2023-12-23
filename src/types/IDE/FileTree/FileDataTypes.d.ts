export interface FileNodeType {
  id: string;
  name: string;
  children?: FileNodeType[];
  type: string;

  isDirty?: boolean;
  isOpened?: boolean;
  language?: string;
  filePath?: string;
  content?: string | null;
}
