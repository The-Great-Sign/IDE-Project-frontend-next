'use client';

import React from 'react';
import { IconContext } from 'react-icons';
import { AiOutlineApple, AiOutlineGoogle } from 'react-icons/ai';
import {
  AppleButton,
  ButtonBox,
  KaKaoButton,
  LoginBox,
  LoginConatiner,
  Logo,
  StyledImage,
} from './Login.styles';
import { BigButton } from '@/components/Button/Button';
import Kakaoicon from '../../public/images/kakaoicon.png';
import { StyledLink } from '@/components/MainHeader/MainHeader.style';

const LoginPage = () => {
  const handleGoogleLogin = () => {
    const googleLoginURL = `${process.env.NEXT_PUBLIC_BACKEND_URI}/oauth2/authorization/google`;
    window.location.href = googleLoginURL;
  };
  const handleKakaoLogin = () => {
    const kakaoLoginURL = `${process.env.NEXT_PUBLIC_BACKEND_URI}/oauth2/authorization/kakao`;
    window.location.href = kakaoLoginURL;
  };

  return (
    <>
      <IconContext.Provider
        value={{
          style: {
            width: '1.3rem',
            height: '1.3rem',
            margin: '0 5px 0 0',
          },
        }}
      >
        <LoginConatiner>
          <StyledLink href={'/'}>
            <Logo>DJIDE</Logo>
          </StyledLink>
          <LoginBox>
            <h2>로그인</h2>

            <ButtonBox>
              <BigButton onClick={handleGoogleLogin}>
                <AiOutlineGoogle />
                <span>구글로 계속하기</span>
              </BigButton>

              <KaKaoButton onClick={handleKakaoLogin}>
                <StyledImage
                  src={Kakaoicon}
                  alt="카카오 아이콘"
                  width="24"
                  height="24"
                />
                <span>카카오로 계속하기</span>
              </KaKaoButton>
              <AppleButton disabled>
                <AiOutlineApple />
                <span>애플로 계속하기</span>
              </AppleButton>
            </ButtonBox>
          </LoginBox>
        </LoginConatiner>
      </IconContext.Provider>
    </>
  );
};

export default LoginPage;
