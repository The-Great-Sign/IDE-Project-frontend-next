import axiosInstance from '../api/axiosInstance';
import { findPath } from '@/utils/fileTreeUtils';
import { FileNodeType } from '@/types/IDE/FileTree/FileDataTypes';
import { useFileTreeStore } from '@/store/useFileTreeStore';

const useHandleCreateFile = () => {
  const projectId = 'ebc63279-89b9-4b1d-bb4d-1270130c3d4d'; //임시
  const handleCreateFileRequest = async (
    node: FileNodeType,
    newNodeName: string
  ) => {
    try {
      const fileTree = useFileTreeStore.getState().fileTree;
      const nowFilePath = findPath(fileTree, node.id) + newNodeName;
      let responseData;

      if (node.isFile) {
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

      return responseData;
    } catch (error) {
      console.error(error);
    }
  };
  return handleCreateFileRequest;
};

export default useHandleCreateFile;
