'use client';

import React from 'react';
import { IconContext } from 'react-icons';
import {
  AiOutlineApple,
  AiOutlineGithub,
  AiOutlineGoogle,
} from 'react-icons/ai';
import { ButtonBox, LoginBox, LoginConatiner, Logo } from './Login.styles';
import { BigButton } from '@/components/Button/Button';

const LoginPage = () => {
  const handleGoogleLogin = () => {
    const googleLoginURL = `${process.env.NEXT_PUBLIC_BACKEND_URI}/oauth2/authorization/google?redirect_uri=${process.env.NEXT_PUBLIC_API_BASE_URL}&mode=login`;
    window.location.href = googleLoginURL;
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
          <Logo>DJIDE</Logo>
          <LoginBox>
            <h2>로그인</h2>

            <ButtonBox>
              <BigButton onClick={handleGoogleLogin}>
                <AiOutlineGoogle />
                <span>구글로 계속하기</span>
              </BigButton>

              <BigButton disabled>
                <AiOutlineGithub />
                <span>깃허브로 계속하기</span>
              </BigButton>
              <BigButton disabled>
                <AiOutlineApple />
                <span>애플로 계속하기</span>
              </BigButton>
            </ButtonBox>
          </LoginBox>
        </LoginConatiner>
      </IconContext.Provider>
    </>
  );
};

export default LoginPage;
