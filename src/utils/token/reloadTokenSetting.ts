import { fetchUserInfo } from '@/app/api/user/fetchUserInfo';
import useTokenStore from '@/store/useTokenStore';

export const reloadTokenSetting = (storedAccessToken: string) => {
  if (storedAccessToken) {
    useTokenStore.getState().setAccessToken(storedAccessToken);
    useTokenStore.getState().setLogin(true);
    fetchUserInfo();
  }
};
