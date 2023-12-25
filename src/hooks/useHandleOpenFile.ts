// useHandleOpenFile.ts
import { useFileStore } from '@/store/useFileStore';
import axiosInstance from '@/app/api/axiosInstance';
import { useFileTreeStore } from '@/store/useFileTreeStore';
import { getCurrentProjectId } from '@/app/ide/[projectId]/page';

const useHandleOpenFile = () => {
  const fileStore = useFileStore();
  const projectId = getCurrentProjectId();

  const handleOpenFile = async (
    fileId: string,
    fileName: string,
    fileLanguage: string
  ) => {
    const filePath = useFileTreeStore.getState().findNodePath(fileId);
    const params = { projectId, filePath };

    try {
      const response = await axiosInstance.get('/api/files', { params });
      console.log(response);
      const fileContent = response.data.content;

      fileStore.openFile(fileId, fileName, fileLanguage, fileContent);
      fileStore.selectFile(fileId);
    } catch (error) {
      console.error('Error fetching file content:', error);
    }
  };

  return handleOpenFile;
};

export default useHandleOpenFile;
