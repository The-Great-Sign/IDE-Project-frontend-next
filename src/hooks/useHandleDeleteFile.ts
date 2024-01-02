import axiosInstance from '../app/api/axiosInstance';
import { FileNodeType } from '@/types/IDE/FileTree/FileDataTypes';

export interface DeleteNodeResponseProps {
  success: boolean;
  message: string;
  results: string;
}

const useHandleDeleteFileRequest = () => {
  const handleDeleteFileRequest = async (
    node: FileNodeType
  ): Promise<DeleteNodeResponseProps> => {
    try {
      let response;
      if (node.type === 'FILE') {
        response = await axiosInstance.delete(`/api/v2/files/${node.id}`);
      } else {
        response = await axiosInstance.delete(`/api/v2/directories/${node.id}`);
      }
      return response.data; // 가정: 서버 응답이 DeleteNodeResponseProps 형식을 따름
    } catch (error) {
      console.error(error);
      // 에러 발생 시 DeleteNodeResponseProps 타입에 맞는 객체 반환
      return { success: false, message: 'Error occurred', results: '' };
    }
  };

  return handleDeleteFileRequest;
};

export default useHandleDeleteFileRequest;
