import { create } from 'zustand';

// 스토어의 상태를 정의하는 인터페이스
interface TreeNodeState {
  newNodeName: string;
  setNewNodeName: (name: string) => void;
  // 기타 상태 및 함수 타입 정의...
}

// 스토어 생성
export const useTreeNodeStore = create<TreeNodeState>(set => ({
  newNodeName: '',
  setNewNodeName: (name: string) => set({ newNodeName: name }),
  // 기타 상태 및 함수 구현...
}));
