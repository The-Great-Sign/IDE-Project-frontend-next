import React from 'react';
import useUserStore from '../../../store/useUserStore';
import { UserInfoDiv, UserName } from './UserInfo.style';
import Image from 'next/image';
import styled from 'styled-components';
import StyledLink from '@/components/StyledLink/StyledLink';
import { IMAGE_SIZE } from '@/constants/userInfo';

export const UserInfo = () => {
  const { name, imageUrl } = useUserStore();

  const handleLogout = () => {
    useUserStore.getState().setLogin(false);
    localStorage.removeItem('accessToken');
    sessionStorage.clear();
  };

  return (
    <UserInfoDiv>
      <UserName>{name}</UserName>
      <StyledLink
        href="/mypage"
        style={{ textDecoration: 'none', color: 'inherit' }}
      >
        <StyledImgDiv>
          <StyledImage
            src={imageUrl}
            alt={`${name}의 프로필 이미지`}
            width={IMAGE_SIZE}
            height={IMAGE_SIZE}
            layout="fixed"
          />
        </StyledImgDiv>
      </StyledLink>

      <StyledLogout onClick={handleLogout}>
        <span>로그아웃</span>
      </StyledLogout>
    </UserInfoDiv>
  );
};

export default UserInfo;

const StyledImage = styled(Image)`
  width: ${IMAGE_SIZE}px;
  height: ${IMAGE_SIZE}px;
`;

const StyledLogout = styled.div`
  font-size: 0.8rem;
  margin-left: 10px;
  cursor: pointer;
`;

const StyledImgDiv = styled.div`
  border-radius: 50%;
  overflow: hidden;
  width: ${IMAGE_SIZE}px;
  height: ${IMAGE_SIZE}px;
`;
