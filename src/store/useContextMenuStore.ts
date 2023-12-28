import { create } from 'zustand';

interface ContextMenuState {
  hoveredId: string;
  setHoveredId: (hoveredId: string) => void;
}

export const useContextMenuStore = create<ContextMenuState>(set => ({
  hoveredId: '',
  setHoveredId: hoveredId => set({ hoveredId }),
}));
