'use client';
import React, { useEffect } from 'react';

import useUserStore from '@/store/useUserStore';
import MainHeader from '@/components/MainHeader/MainHeader';
import {
  PageContainer,
  TitleDiv,
  H2,
  ProfileCard,
  StyledImage,
  UserInfo,
  UserName,
  Stats,
  AccountInfo,
  StyledButton,
  Avatar,
} from './Mypage.styles';
import useTokenStore from '@/store/useTokenStore';
import { reloadTokenSetting } from '@/utils/token/reloadTokenSetting';
import { useRouter } from 'next/router';

const MyPage = () => {
  const { name, email, imageUrl } = useUserStore.getState();
  const myProjectNum = 3;
  const invitedProjectNum = 3;
  const router = useRouter();

  useEffect(() => {
    const storedAccessToken = useTokenStore.getState().accessToken;
    if (storedAccessToken) {
      reloadTokenSetting(storedAccessToken);
    } else {
      router.push(`/`);
    }
  }, []);

  return (
    <>
      <MainHeader />
      <PageContainer>
        <TitleDiv>
          <H2>사용자 정보</H2>
        </TitleDiv>
        <ProfileCard>
          <Avatar>
            <StyledImage
              src={imageUrl}
              alt={`프로필 이미지`}
              width={80}
              height={80}
            />
          </Avatar>
          <UserInfo>
            <UserName>{name}님</UserName>
            <StyledButton>이름 변경</StyledButton>
          </UserInfo>
          <Stats>
            <AccountInfo>생성한 프로젝트 수 : {myProjectNum}개 </AccountInfo>
            <AccountInfo>
              초대받은 프로젝트 수 : {invitedProjectNum}개
            </AccountInfo>
            <AccountInfo>로그인한 계정: {email}</AccountInfo>
          </Stats>
        </ProfileCard>
      </PageContainer>
    </>
  );
};

export default MyPage;
