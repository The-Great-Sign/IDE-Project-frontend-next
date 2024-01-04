import axiosInstance from '@/app/api/axiosInstance';
import { getCurrentProjectId } from '@/app/api/websocket';
import { FileTreeState, useFileTreeStore } from '@/store/useFileTreeStore';
import { FileNodeType } from '@/types/IDE/FileTree/FileDataTypes';

export const moveFile = async (
  node: FileNodeType | null,
  parentId: string | null,
  befParentId: string | null,
  state: FileTreeState,
  dragIds: string[]
) => {
  try {
    const projectId = getCurrentProjectId();
    let findParentPath;
    if (node && node.type === 'FILE' && befParentId !== parentId) {
      const nowFilePath = state.findNodePath(node.id);
      const deleteResponse = await axiosInstance.delete('/api/files', {
        data: { projectId: projectId, path: nowFilePath },
      });

      dragIds.forEach((id: string) =>
        useFileTreeStore.getState().deleteNode(id)
      );

      useFileTreeStore.getState().addNode(node, parentId);

      if (parentId) {
        findParentPath = state.findNodePath(parentId) + '/' + node.name;
      } else {
        findParentPath = '/' + node.name;
      }

      await axiosInstance.post('/api/files', {
        projectId: projectId,
        directories: null,
        files: findParentPath,
        content: '',
      });

      return deleteResponse;
    }
  } catch (error) {
    console.error('Error deleting file:', error);
    alert('파일 삭제 중 오류가 발생했습니다.');
  }
};
