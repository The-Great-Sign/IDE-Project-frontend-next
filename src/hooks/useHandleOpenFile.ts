// useHandleOpenFile.ts
import { useFileStore } from '@/store/useFileStore';
import axiosInstance from '@/app/api/axiosInstance';

const useHandleOpenFile = () => {
  const fileStore = useFileStore();

  //id값 바꿔야 됨
  const handleOpenFile = async (
    fileId: string,
    fileName: string,
    fileLanguage: string
  ) => {
    try {
      const response = await axiosInstance.get(`/api/v2/files/${fileId}`);
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
