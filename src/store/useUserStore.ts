import { create } from 'zustand';

// 랜덤 라이브커서 색 생성
const hex = '#' + Math.round(Math.random() * 0xffffff).toString(16);

// 랜덤 이름 생성
// const names =
// const randInt = Math.floor(Math.random() * names.length);
// const name = names[randInt];

// 랜덤 ID 생성 -> 실제 유저 데이터로 바꿀 예정
const randId = Math.floor(Math.random() * 100);

interface UserState {
  id: string;
  name: string;
  imageUrl: string;
  cursorColor: string;
  setUser: (id: string, name: string, imageUrl: string) => void;
  isLoggedIn: boolean;
  toggleLogin: () => void;
  setLogin: (state: boolean) => void;
}

// id 유니크 값으로 바꾸기!
const useUserStore = create<UserState>(set => ({
  id: String(randId),
  name: '로그인안됨',
  imageUrl: '',
  cursorColor: hex,
  setUser: (id, name, imageUrl) =>
    set({ id: id, name: name, imageUrl: imageUrl }),
  isLoggedIn: false,
  toggleLogin: () => set(state => ({ isLoggedIn: !state.isLoggedIn })),
  setLogin: (state: boolean) => set({ isLoggedIn: state }),
}));

export default useUserStore;
