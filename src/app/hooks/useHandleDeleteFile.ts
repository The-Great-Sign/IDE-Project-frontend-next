import axiosInstance from '../api/axiosInstance';
import { findNowFilePath } from '@/utils/fileTreeUtils';
import { NodeApi } from 'react-arborist';
import { FileNodeType } from '@/types/IDE/FileTree/FileDataTypes';

const useHandleDeleteFileRequest = (node: NodeApi<FileNodeType>) => {
  const projectId = 'ebc63279-89b9-4b1d-bb4d-1270130c3d4d'; //임시

  const handleDeleteFileRequest = async () => {
    try {
      const nowFilePath = findNowFilePath(node);

      const response = await axiosInstance.delete('/api/files', {
        data: { projectId: projectId, filePath: nowFilePath },
      });

      return response.data.success;
    } catch (error) {
      console.error(error);
    }
  };

  return handleDeleteFileRequest;
};

export default useHandleDeleteFileRequest;
