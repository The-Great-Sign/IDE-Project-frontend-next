import axiosInstance from '@/app/api/axiosInstance';
import useUserStore from '@/store/useUserStore';

// 사용자 정보를 가져오는 함수
export const fetchUserInfo = async () => {
  try {
    const response = await axiosInstance.get('/user/info');
    const { id, nickname, imageUrl, email } = response.data.results;
    useUserStore.getState().setUser(id, nickname, imageUrl);
    useUserStore.getState().setUserEmail(email);
  } catch (error) {
    console.error('사용자 정보를 가져오는 데 실패했습니다.', error);
  }
};
