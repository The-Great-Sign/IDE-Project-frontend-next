import { FileNodeType } from '@/types/IDE/FileTree/FileDataTypes';

export const removeNodeById = (
  nodes: FileNodeType[],
  nodeId: string | null
) => {
  return nodes.reduce((acc: FileNodeType[], node: FileNodeType) => {
    if (node.id !== nodeId) {
      const newNode = { ...node };
      if (node.children) {
        newNode.children = removeNodeById(node.children, nodeId);
      }
      acc.push(newNode);
    }
    return acc;
  }, []);
};

export const isCorrectName = (inputName: string) => {
  if (inputName === '') {
    alert('한 글자 이상 입력하세요.');
    return false;
  } else if (inputName === '.' || inputName === '..') {
    alert(
      `${inputName}이라는 이름은 파일 또는 폴더 이름으로 올바르지 않습니다. 다른 이름을 입력하세요.`
    );
    return false;
  }
  return true;
};

interface LangSwtichType {
  [key: string]: string;
}

export const findLanguage = (extendsName: string) => {
  const supportLang: LangSwtichType = {
    py: 'python',
    java: 'java',
    html: 'html',
    css: 'css',
    cpp: 'c++',
    js: 'javascript',
    json: 'JSON',
    md: 'markdown',
  };

  const language = supportLang[extendsName];

  return language;
};

interface NodeWithParent {
  node: FileNodeType | null;
  befParentId: string | null;
}

export const findNodeById = (
  nodes: FileNodeType[],
  nodeId: string | null,
  currentParentId: string | null
): NodeWithParent => {
  for (const node of nodes) {
    if (node.id === nodeId) {
      return { node, befParentId: currentParentId };
    }
    if (node.children) {
      const foundNode = findNodeById(node.children, nodeId, node.id);
      if (foundNode.node) {
        return foundNode;
      }
    }
  }
  return { node: null, befParentId: null };
};

export const findFilePath = (
  nodes: FileNodeType[],
  targetId: string,
  path = ''
): string | null => {
  for (const node of nodes) {
    const currentPath = path === '' ? '/' + node.name : path + '/' + node.name;

    if (node.id === targetId) {
      return currentPath;
    }

    if (node.children) {
      const foundPath: string | null = findFilePath(
        node.children,
        targetId,
        currentPath
      );
      if (foundPath) return foundPath;
    }
  }
  return null;
};

export interface ServerNode {
  id: string;
  name: string;
  type: 'FILE' | 'DIRECTORY';
  children?: ServerNode[];
  path: string;
}

export interface ServerResponse {
  results: ServerNode[];
}

export const transformToFileNodeType = (
  nodes: ServerNode[]
): FileNodeType[] => {
  return nodes.map(node => {
    const fileNode: FileNodeType = {
      id: node.id,
      name: node.name,
      isFile: node.type === 'FILE',
      isDirty: false,
      isOpened: false,
      filePath: node.path,
    };

    // 폴더 노드의 경우에만 children 속성 추가
    if (node.type === 'DIRECTORY' && node.children) {
      fileNode.children = transformToFileNodeType(node.children);
    }

    return fileNode;
  });
};
