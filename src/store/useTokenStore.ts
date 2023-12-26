import { create } from 'zustand';

interface TokenState {
  accessToken: string;
  tokenExpiryTime: Date | null;
  setAccessToken: (accessToken: string) => void;
}

const initAccessToken = () => {
  if (typeof window === 'undefined') {
    return '';
  }
  return window.localStorage.getItem('accessToken') ?? '';
};

function decodeJwt(token: string) {
  const payload = token.split('.')[1];
  const base64 = payload.replace(/-/g, '+').replace(/_/g, '/');
  const decodedPayload = atob(base64);
  return JSON.parse(decodedPayload);
}

function getJwtExpiration(token: string) {
  const decoded = decodeJwt(token);
  return decoded.exp ? new Date(decoded.exp * 1000) : null;
}

const useTokenStore = create<TokenState>(set => ({
  accessToken: initAccessToken(),
  tokenExpiryTime: null,
  setAccessToken: accessToken => {
    const expiryTime = getJwtExpiration(accessToken);
    set({ accessToken, tokenExpiryTime: expiryTime });
  },
}));

export default useTokenStore;
