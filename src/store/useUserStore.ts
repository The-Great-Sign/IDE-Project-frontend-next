import { create } from "zustand";

interface UserState {
  isLoggedIn: boolean;
  toggleLogin: () => void;
}

const useUserStore = create<UserState>((set) => ({
  isLoggedIn: true,
  toggleLogin: () => set((state) => ({ isLoggedIn: !state.isLoggedIn })),
}));

export default useUserStore;
