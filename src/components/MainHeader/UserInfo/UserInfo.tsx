import { UserInfoDiv, UserName, UserProfileImg } from './UserInfo.style';

export const UserInfo = () => {
  return (
    <UserInfoDiv>
      <UserProfileImg />
      <UserName>유저 이름</UserName>
    </UserInfoDiv>
  );
};

export default UserInfo;
