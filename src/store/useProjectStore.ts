import { create } from 'zustand';

export interface ProjectProps {
  id: string;
  name: string;
  description: string;
  programmingLanguage: string;
  createdAt: string; ///// 타입이 뭐지
  updatedAt: string; ///// 타입이 뭐지
}

interface ProjectState {
  projects: ProjectProps[];
  addProject: (project: ProjectProps) => void;
}

const useProjectStore = create<ProjectState>(set => ({
  projects: [],
  addProject: (project: ProjectProps) =>
    set(state => ({
      projects: [...state.projects, project as ProjectProps],
    })),
}));

export default useProjectStore;
