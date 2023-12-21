import { NodeApi } from 'react-arborist';
import axiosInstance from '../api/axiosInstance';
import { findNowFilePath } from '@/utils/fileTreeUtils';
import { FileNodeType } from '@/types/IDE/FileTree/FileDataTypes';

const useHandleCreateFile = (node: NodeApi<FileNodeType>) => {
  const projectId = 'ebc63279-89b9-4b1d-bb4d-1270130c3d4d'; //임시
  const handleCreateFileRequest = async (newNodeName: string) => {
    try {
      const nowFilePath = findNowFilePath(node) + newNodeName;
      let responseData;

      //directory or file 구별
      if (node.isInternal) {
        const response = await axiosInstance.post('/api/files', {
          projectId: projectId,
          directories: nowFilePath,
          files: null,
          content: 'print("Hello, World!")',
        });
        responseData = response.data;
      } else {
        const response = await axiosInstance.post('/api/files', {
          projectId: projectId,
          directories: null,
          files: nowFilePath,
          content: 'print("Hello, World!")',
        });
        responseData = response.data;
      }

      //응답받은 filename, content .. 등 필요 정보 담아두기 -> 총미

      return responseData;
    } catch (error) {
      console.error(error);
    }
  };
  return handleCreateFileRequest;
};

export default useHandleCreateFile;
