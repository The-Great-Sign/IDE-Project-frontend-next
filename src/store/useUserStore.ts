import { create } from 'zustand';

interface UserState {
  id: string | null;
  name: string | null;
  imageUrl: string | null;
  setUser: (id: string, name: string, imageUrl: string) => void;
  isLoggedIn: boolean;
  toggleLogin: () => void;
}

const useUserStore = create<UserState>(set => ({
  id: null,
  name: null,
  imageUrl: null,
  setUser: (id, name, imageUrl) => set({ id, name, imageUrl }),
  isLoggedIn: false,
  toggleLogin: () => set(state => ({ isLoggedIn: !state.isLoggedIn })),
}));

export default useUserStore;
