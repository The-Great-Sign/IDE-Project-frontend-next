import { create } from 'zustand';

const randId = Math.floor(Math.random() * 100);
interface UserState {
  id: string;
  name: string | null;
  imageUrl: string;
  cursorColor: string;
  setUser: (id: string, name: string, imageUrl: string) => void;
}

const useUserStore = create<UserState>(set => ({
  id: String(randId),
  name: '로그인안됨',
  imageUrl: 'https://liveblocks.io/avatars/avatar-4.png',
  cursorColor: '#00A86B',
  setUser: (id, name, imageUrl) =>
    set({ id: id, name: name, imageUrl: imageUrl }),
}));

export default useUserStore;
