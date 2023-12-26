import { Client } from '@stomp/stompjs';
import { create } from 'zustand';

export interface ExecuteState {
  success: boolean;
  message: string;
  results: 'PENDING' | 'RUNNING';
}

export interface ProjectProps {
  id: string;
  name: string;
  description: string;
  programmingLanguage: string;
  createdAt: string;
  updatedAt: string;
}

interface ProjectState {
  executeState: ExecuteState;
  setExecuteState: (execute: ExecuteState) => void;

  status: 'PENDING' | 'RUNNING';
  setStatus: (currentstatus: 'PENDING' | 'RUNNING') => void;

  currentProject: ProjectProps;
  projects: ProjectProps[];
  pp: string;
  setProject: (project: ProjectProps) => void;
  setProjectId: (id: string) => void;
  addProject: (project: ProjectProps) => void;
  cRef: Client | null;
  setClient: (cref: Client | null) => void;
}

const useProjectStore = create<ProjectState>(set => ({
  executeState: {
    // 실행 요청 결과
    success: false,
    message: '',
    results: 'PENDING',
  },
  setExecuteState: (execute: ExecuteState) => set({ executeState: execute }),

  status: 'PENDING',
  setStatus: (currentstatus: 'PENDING' | 'RUNNING') =>
    set({ status: currentstatus }),

  currentProject: {
    // 생성된 프로젝트 정보
    id: '',
    name: '',
    description: '',
    programmingLanguage: '',
    createdAt: '',
    updatedAt: '',
  },
  pp: '',
  projects: [], // 프로젝트 목록
  setProject: (project: ProjectProps) => set({ currentProject: project }),
  setProjectId: (id: string) => set({ pp: id }),
  addProject: (project: ProjectProps) =>
    set(state => ({
      projects: [...state.projects, project as ProjectProps],
    })),

  cRef: null,
  setClient: (cref: Client | null) => set({ cRef: cref }),
}));

export default useProjectStore;
