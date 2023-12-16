import { create } from 'zustand';

interface TokenState {
  accessToken: string | null;
  tokenExpiryTime: string | null;
  setAccessToken: (
    accessToken: string | null,
    tokenExpiryTime: string | null
  ) => void;
}

const useTokenStore = create<TokenState>(set => ({
  accessToken: null,
  tokenExpiryTime: null,
  setAccessToken: (token, expiryTime) =>
    set({ accessToken: token, tokenExpiryTime: expiryTime }),
}));

export default useTokenStore;
