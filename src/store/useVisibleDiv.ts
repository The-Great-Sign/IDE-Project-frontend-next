import { create } from 'zustand';

interface DivStore {
  isvisibleDiv: boolean;
  toggleDiv: () => void;
}

export const useVisibleDiv = create<DivStore>(set => ({
  isvisibleDiv: true,
  toggleDiv: () => set(state => ({ isvisibleDiv: !state.isvisibleDiv })),
}));
