'use client';

import React from 'react';
import { IconContext } from 'react-icons';
import {
  AiOutlineApple,
  AiOutlineGithub,
  AiOutlineGoogle,
} from 'react-icons/ai';
import { ButtonBox, LoginBox, LoginConatiner, Logo } from './Login.style';
import { BigButton } from '@/components/Button/Button';

const LoginPage = () => {
  return (
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
            <BigButton>
              <AiOutlineGoogle />
              <span>구글로 계속하기</span>
            </BigButton>
            <BigButton>
              <AiOutlineGithub />
              <span>깃허브로 계속하기</span>
            </BigButton>
            <BigButton>
              <AiOutlineApple />
              <span>애플로 계속하기</span>
            </BigButton>
          </ButtonBox>
        </LoginBox>
      </LoginConatiner>
    </IconContext.Provider>
  );
};

export default LoginPage;
