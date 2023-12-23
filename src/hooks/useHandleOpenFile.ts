// useHandleOpenFile.ts
import { useFileStore } from '@/store/useFileStore';
import axiosInstance from '@/app/api/axiosInstance';
import useProjectStore from '@/store/useProjectStore';
import { useFileTreeStore } from '@/store/useFileTreeStore';

const useHandleOpenFile = () => {
  const fileStore = useFileStore();
  const projectId = useProjectStore.getState().currentProject.id;

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
      // const fileContent = response.data.content;
      // const fileContent = 'hi';

      fileStore.openFile(fileId, fileName, fileLanguage);
      fileStore.selectFile(fileId);
    } catch (error) {
      console.error('Error fetching file content:', error);
    }
  };

  return handleOpenFile;
};

export default useHandleOpenFile;
