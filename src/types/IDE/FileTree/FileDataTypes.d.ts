export interface FileNodeType {
  id: string;
  name: string;
  children?: FileNodeType[];

  isDirty?: boolean;
  isOpened?: boolean;
  language?: string;
  filePath?: string;
  content?: string | null;
}
