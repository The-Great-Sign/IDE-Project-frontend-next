import { transformToFileNodeType } from './fileTreeUtils';
import { useFileTreeStore } from '@/store/useFileTreeStore';
import axiosInstance from '@/app/api/axiosInstance';

export const checkFileTree = async (projectId: string) => {
  try {
    const { setFileTree, fileTree } = useFileTreeStore.getState();

    const response = await axiosInstance.get(
      `/api/projects/${projectId}/directory`
    );
    const transformedData = transformToFileNodeType(response.data.results);
    console.log('원래응답');
    console.log(response.data.results);
    console.log('바뀐데이터 타입');
    console.log(transformedData);

    setFileTree(transformedData); // Zustand 스토어에 저장
    console.log(fileTree);

    return response;
  } catch (error) {
    console.error(error);
  }
};
