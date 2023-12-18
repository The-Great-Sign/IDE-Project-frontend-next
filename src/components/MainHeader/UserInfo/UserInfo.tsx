import React from 'react';
import useUserStore from '../../../store/useUserStore';
import { UserInfoDiv, UserName, UserProfileImg } from './UserInfo.style';

export const UserInfo = () => {
  const { name } = useUserStore();

  return (
    <UserInfoDiv>
      <UserProfileImg />
      <UserName>{name}</UserName>
    </UserInfoDiv>
  );
};

export default UserInfo;
