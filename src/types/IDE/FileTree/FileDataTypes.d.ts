export interface FileNodeType {
  id: string;
  name: string;
  children?: FileNodeType[];
  type: string;
  parentId: string | number | null;

  isDirty?: boolean;
  isOpened?: boolean;
  language?: string;
  filePath?: string | null;
  content?: string | null;
}
