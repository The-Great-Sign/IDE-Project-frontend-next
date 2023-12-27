'use client';

import React from 'react';
import useUserStore from '../../../store/useUserStore';
import {
  StyledImage,
  StyledImgDiv,
  StyledLogout,
  UserInfoDiv,
  UserName,
} from './UserInfo.style';
import StyledLink from '@/components/StyledLink/StyledLink';
import { IMAGE_SIZE } from '@/constants/userInfo';
import useTokenStore from '@/store/useTokenStore';
import { usePathname, useRouter } from 'next/navigation';
import { deleteCookie } from '@/utils/token/cookieUtils';

export const UserInfo = () => {
  const { name, imageUrl } = useUserStore();

  const router = useRouter();
  const pathName = usePathname();

  const handleLogout = () => {
    useTokenStore.getState().setLogin(false);
    localStorage.removeItem('accessToken');
    deleteCookie('refreshToken');
    sessionStorage.clear();
    router.push(pathName);
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
