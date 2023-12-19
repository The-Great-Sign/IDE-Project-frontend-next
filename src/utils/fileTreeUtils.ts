import useCurrentOpenFile from '@/store/useCurrentOpenFile';
import { NodeData } from '@/types/IDE/FileTree/FileDataTypes';
import { NodeApi } from 'react-arborist';

export const findNowFilePath = (node: NodeApi<NodeData> | null) => {
  let filePath = '';
  while (node!.data.id !== '__REACT_ARBORIST_INTERNAL_ROOT__') {
    const newFile = '/' + node!.data.name;
    filePath = newFile + filePath;
    if (node) {
      node = node.parent;
    }
  }
  useCurrentOpenFile.getState().setFiles(filePath);
};
