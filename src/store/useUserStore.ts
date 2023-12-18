import { create } from 'zustand';

// 랜덤 라이브커서 색 생성
const hex = '#' + Math.round(Math.random() * 0xffffff).toString(16);

// 랜덤 이름 생성
const names = ['Dehan', 'Musfiq', 'Rahim', 'Sohel', 'MOhit', 'Rachel'];
const randInt = Math.floor(Math.random() * names.length);
const name = names[randInt];

// 랜덤 ID 생성 -> 실제 유저 데이터로 바꿀 예정
const randId = Math.floor(Math.random() * 100);

interface UserState {
  id: number;
  name: string;
  imageUrl: string | null;
  cursorColor: string;
  setUser: (
    id: number,
    name: string,
    imageUrl: string,
    cursorColor: string
  ) => void;
  isLoggedIn: boolean;
  toggleLogin: () => void;
}

const useUserStore = create<UserState>(set => ({
  id: randId,
  name: name,
  imageUrl: null,
  cursorColor: hex,
  setUser: (id, name, imageUrl, cursorColor) =>
    set({ id, name, imageUrl, cursorColor }),
  isLoggedIn: false,
  toggleLogin: () => set(state => ({ isLoggedIn: !state.isLoggedIn })),
}));

export default useUserStore;
