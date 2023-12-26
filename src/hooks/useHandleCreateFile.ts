import axiosInstance from '../app/api/axiosInstance';
import { FileNodeType } from '@/types/IDE/FileTree/FileDataTypes';
import { useFileTreeStore } from '@/store/useFileTreeStore';
import { getCurrentProjectId } from '@/app/ide/[projectId]/page';

const useHandleCreateFile = () => {
  const projectId = getCurrentProjectId();

  const handleCreateFileRequest = async (
    node: FileNodeType,
    newNodeName: string
  ) => {
    try {
      let sendFilePath;
      let responseData;

      //요청 보낼 파일 부모의 경로 구하기
      const parentPath = useFileTreeStore
        .getState()
        .findNodePath(node.parentId);

      //요청 보낼 파일의 전체 경로
      if (parentPath == null) {
        sendFilePath = '/' + newNodeName;
      } else {
        sendFilePath = parentPath + '/' + newNodeName;
      }

      if (node.type === 'FILE') {
        //서버 생성 요청 -> 파일
        const response = await axiosInstance.post('/api/v2/files', {
          projectId: projectId,
          path: sendFilePath,
        });
        responseData = response.data;
      } else {
        //서버 생성 요청 -> 폴더
        const response = await axiosInstance.post('/api/v2/directories', {
          projectId: projectId,
          path: sendFilePath,
        });
        responseData = response.data;
      }
      console.log(responseData);

      return responseData;
    } catch (error) {
      console.error(error);
    }
  };
  return handleCreateFileRequest;
};

export default useHandleCreateFile;
