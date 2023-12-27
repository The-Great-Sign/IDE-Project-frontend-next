'use client';
import React, { useEffect, useState } from 'react';

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
  NameInput,
} from './Mypage.styles';
import useTokenStore from '@/store/useTokenStore';
import { reloadTokenSetting } from '@/utils/token/reloadTokenSetting';
import { useRouter } from 'next/navigation';
import axiosInstance from '../api/axiosInstance';

const MyPage = () => {
  const { name, email, imageUrl } = useUserStore.getState();
  const myProjectNum = 3;
  const invitedProjectNum = 3;

  const router = useRouter();
  const [updateUserName, setUpdateUserName] = useState<string>('');
  const [isEditName, setIsEditName] = useState<boolean>(false);

  const handleUpdateUserName = async (updateUserName: string) => {
    try {
      console.log(updateUserName);
      const response = await axiosInstance.patch(`/user/update/nickname`, {
        nickname: updateUserName,
      });
      // 요청이 성공적으로 처리되었을 때의 로직
      console.log('Nickname updated successfully:', response.data);

      if (response.data.success) {
        useUserStore.getState().setNewName(updateUserName);
      }
      setIsEditName(false);
    } catch (error) {
      // 에러 처리 로직
      console.error('Error updating nickname:', error);
    }
  };

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
            {isEditName ? (
              <>
                <NameInput
                  value={updateUserName}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                    setUpdateUserName(e.target.value);
                  }}
                />
                <StyledButton
                  onClick={() => handleUpdateUserName(updateUserName)}
                >
                  수정 완료
                </StyledButton>
              </>
            ) : (
              <>
                <UserName>{name} 님</UserName>
                <StyledButton onClick={() => setIsEditName(true)}>
                  이름 변경
                </StyledButton>
              </>
            )}
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
