import { useFileStore } from '@/store/useFileStore';
import axiosInstance from '../api/axiosInstance';
import { FileNodeType } from '@/types/IDE/FileTree/FileDataTypes';
import { NodeApi } from 'react-arborist';
import { useFileTreeStore } from '@/store/useFileTreeStore';

const useHandleOpenFile = () => {
  const fileStore = useFileStore();

  const projectId = '900feca1-b386-4c24-bdbf-8b4aa64c8b24';

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const handleOpenFile = async (node: NodeApi<FileNodeType>) => {
    const fileId = node.id;
    const fileName = node.data.name;
    const fileLanguage = 'python'; // Determine language based on file extension or other logic

    fileStore.openFile(fileId, fileName, fileLanguage);
    fileStore.selectFile(fileId);

    try {
      const nowFilePath = useFileTreeStore.getState().findNodePath(node.id);
      // const nowFilePath = findNowFilePath(node);
      const params = { projectId: projectId, filePath: nowFilePath };

      const { data } = await axiosInstance.get('/api/files', {
        params: params,
      });

      return data;
    } catch (error) {
      console.error(error);
    }
  };
  return handleOpenFile;
};

export default useHandleOpenFile;
