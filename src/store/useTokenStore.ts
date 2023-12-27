import { getJwtExpiration } from '@/utils/token/tokenExpiryTimeUtils';
import { create } from 'zustand';

interface TokenState {
  accessToken: string;
  tokenExpiryTime: Date | null;
  setAccessToken: (accessToken: string) => void;
  isLoggedIn: boolean;
  toggleLogin: () => void;
  setLogin: (state: boolean) => void;
}

const initAccessToken = () => {
  if (typeof window === 'undefined') {
    return '';
  }
  return window.localStorage.getItem('accessToken') ?? '';
};

const useTokenStore = create<TokenState>(set => ({
  accessToken: initAccessToken(),
  tokenExpiryTime: null,
  setAccessToken: accessToken => {
    const expiryTime = getJwtExpiration(accessToken);
    set({ accessToken, tokenExpiryTime: expiryTime });
  },
  isLoggedIn: false,
  toggleLogin: () => set(state => ({ isLoggedIn: !state.isLoggedIn })),
  setLogin: (state: boolean) => set({ isLoggedIn: state }),
}));

export default useTokenStore;
