import { useFileStore } from '@/store/useFileStore';
import { findNowFilePath } from '@/utils/fileTreeUtils';
import axiosInstance from '../api/axiosInstance';
import { FileNodeType } from '@/types/IDE/FileTree/FileDataTypes';
import { NodeApi } from 'react-arborist';

const useHandleOpenFile = () => {
  const fileStore = useFileStore();

  const projectId = 'ebc63279-89b9-4b1d-bb4d-1270130c3d4d'; //임시

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const handleOpenFile = async (node: NodeApi<FileNodeType>) => {
    const fileId = node.id;
    const fileName = node.data.name;
    const fileLanguage = 'python'; // Determine language based on file extension or other logic

    fileStore.openFile(fileId, fileName, fileLanguage);
    fileStore.selectFile(fileId);

    try {
      const nowFilePath = findNowFilePath(node);
      const params = { projectId: projectId, filePath: nowFilePath };

      const { data } = await axiosInstance.get('/api/files', {
        params: params,
      });
      console.log(data);

      return data;
    } catch (error) {
      console.error(error);
    }
  };
  return handleOpenFile;
};

export default useHandleOpenFile;
