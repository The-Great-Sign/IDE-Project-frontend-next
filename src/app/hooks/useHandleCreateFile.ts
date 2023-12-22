import axiosInstance from '../api/axiosInstance';
import { FileNodeType } from '@/types/IDE/FileTree/FileDataTypes';
import { useFileTreeStore } from '@/store/useFileTreeStore';

const useHandleCreateFile = () => {
  const projectId = '900feca1-b386-4c24-bdbf-8b4aa64c8b24'; //임시
  const handleCreateFileRequest = async (
    node: FileNodeType,
    newNodeName: string
  ) => {
    try {
      let sendFilePath;
      const nowFilePath = useFileTreeStore.getState().findNodePath(node.id);

      if (nowFilePath == null) {
        sendFilePath = '/' + newNodeName;
      } else {
        sendFilePath = nowFilePath + newNodeName;
      }

      let responseData;

      if (node.isFile) {
        const response = await axiosInstance.post('/api/files', {
          projectId: projectId,
          directories: null,
          files: sendFilePath,
          content: 'print("Hello, World!")',
        });
        responseData = response.data;
      } else {
        const response = await axiosInstance.post('/api/files', {
          projectId: projectId,
          directories: sendFilePath,
          files: null,
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
