import { create } from 'zustand';

interface TokenState {
  accessToken: string;
  tokenExpiryTime: string | null;
  setAccessToken: (accessToken: string) => void;
}

const useTokenStore = create<TokenState>(set => ({
  accessToken: '',
  tokenExpiryTime: null,
  setAccessToken: token => set({ accessToken: token }),
}));

export default useTokenStore;

//여기에 사용할 임시 토큰 저장해두시고, 다른 사용자 필요하시면 accessToken 초기값 바꿔 사용하시면 되겠습니다.
//봉승봉승 : 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ0ZXN0MUBnb29nbGUuY29tIiwicm9sZSI6IlJPTEVfVVNFUiIsImV4cCI6MTcwNDAyNTAyMX0.BCX-iztywjozVUx3Mkz2Oip0NUIo8SScModeV1Bq6Uo', //봉승봉승
