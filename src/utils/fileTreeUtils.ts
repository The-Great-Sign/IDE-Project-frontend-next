import { FileNodeType } from '@/types/IDE/FileTree/FileDataTypes';
import { NodeApi } from 'react-arborist';

export const findNowFilePath = (node: NodeApi<FileNodeType> | null) => {
  let filePath = '';
  while (node!.data.id !== '__REACT_ARBORIST_INTERNAL_ROOT__') {
    const newFile = '/' + node!.data.name;
    filePath = newFile + filePath;
    if (node) {
      node = node.parent;
    }
  }

  return filePath;
};

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
