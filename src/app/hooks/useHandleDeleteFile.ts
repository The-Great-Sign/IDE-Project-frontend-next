import axiosInstance from '../api/axiosInstance';

import { FileNodeType } from '@/types/IDE/FileTree/FileDataTypes';
import { useFileTreeStore } from '@/store/useFileTreeStore';

const useHandleDeleteFileRequest = () => {
  const projectId = '900feca1-b386-4c24-bdbf-8b4aa64c8b24'; //임시

  const handleDeleteFileRequest = async (node: FileNodeType) => {
    try {
      const nowFilePath = useFileTreeStore.getState().findNodePath(node.id);

      let sendPath;
      if (nowFilePath == null) {
        sendPath = '/' + node.name;
      } else {
        sendPath = nowFilePath;
      }

      const response = await axiosInstance.delete('/api/files', {
        data: { projectId: projectId, path: sendPath },
      });

      return response.data.success;
    } catch (error) {
      console.error(error);
    }
  };

  return handleDeleteFileRequest;
};

export default useHandleDeleteFileRequest;
