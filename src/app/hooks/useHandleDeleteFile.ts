import axiosInstance from '../api/axiosInstance';
import { findPath } from '@/utils/fileTreeUtils';
import { FileNodeType } from '@/types/IDE/FileTree/FileDataTypes';
import { useFileTreeStore } from '@/store/useFileTreeStore';

const useHandleDeleteFileRequest = () => {
  const projectId = 'ebc63279-89b9-4b1d-bb4d-1270130c3d4d'; //임시

  const handleDeleteFileRequest = async (node: FileNodeType) => {
    const fileTree = useFileTreeStore.getState().fileTree;
    const nowFilePath = findPath(fileTree, node.id);
    try {
      const response = await axiosInstance.delete('/api/files', {
        data: { projectId: projectId, filePath: nowFilePath },
      });
      console.log(nowFilePath);
      console.log(response);
      return response.data.success;
    } catch (error) {
      console.error(error);
      console.log(nowFilePath);
    }
  };

  return handleDeleteFileRequest;
};

export default useHandleDeleteFileRequest;
