import { create } from 'zustand';

export interface ExecuteState {
  success: boolean;
  message: string;
  results: string;
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
  executeProject: ExecuteState;
  setExecuteState: (execute: ExecuteState) => void;
  currentProject: ProjectProps;
  projects: ProjectProps[];
  setProject: (project: ProjectProps) => void;
  addProject: (project: ProjectProps) => void;
}

const useProjectStore = create<ProjectState>(set => ({
  executeProject: {
    success: false,
    message: '',
    results: '',
  },
  setExecuteState: (execute: ExecuteState) => set({ executeProject: execute }),

  currentProject: {
    // 생성된 프로젝트 정보
    id: '',
    name: '',
    description: '',
    programmingLanguage: '',
    createdAt: '',
    updatedAt: '',
  },
  projects: [], // 프로젝트 목록
  setProject: (project: ProjectProps) => set({ currentProject: project }),
  addProject: (project: ProjectProps) =>
    set(state => ({
      projects: [...state.projects, project as ProjectProps],
    })),
}));

export default useProjectStore;
