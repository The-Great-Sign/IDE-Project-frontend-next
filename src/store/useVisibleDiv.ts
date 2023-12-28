import { create } from 'zustand';

interface DivStore {
  isvisibleDiv: boolean;
  toggleDiv: () => void;
  isvisibleTerminal: boolean;
  toggleTerminal: () => void;
}

export const useVisibleDiv = create<DivStore>(set => ({
  isvisibleDiv: true,
  toggleDiv: () => set(state => ({ isvisibleDiv: !state.isvisibleDiv })),
  isvisibleTerminal: true,
  toggleTerminal: () =>
    set(state => ({ isvisibleTerminal: !state.isvisibleTerminal })),
}));
