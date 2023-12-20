'use client';

import React from 'react';
import { IconContext } from 'react-icons';
import {
  AiOutlineApple,
  AiOutlineGithub,
  AiOutlineGoogle,
} from 'react-icons/ai';
import { ButtonBox, LoginBox, LoginConatiner, Logo } from './Login.styles';
import { BigButton } from '../../components/Button/Button';
import axiosInstance from '../api/axiosInstance';
import useTokenStore from '../../store/useTokenStore';
import useUserStore from '../../store/useUserStore';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

const LoginPage = () => {
  const router = useRouter();

  const handleLogin = async () => {
    try {
      const { data } = await axiosInstance.get('/oauth2/authorization/google');

      // const { data } = await axiosInstance.post('/api/projects', {

      const accessToken = `Bearer eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ0ZXN0MUBnb29nbGUuY29tIiwicm9sZSI6IlJPTEVfVVNFUiIsImV4cCI6MTcwNDAyNTAyMX0.BCX-iztywjozVUx3Mkz2Oip0NUIo8SScModeV1Bq6Uo`;
      //res.headers['authorization'];
      useTokenStore.getState().setAccessToken(accessToken, '10000');
      useUserStore.getState().setUser(data.id, '대징이', data.imageUrl);
      useUserStore.getState().toggleLogin();
      console.log(useUserStore.getState().isLoggedIn);
      router.push('/');

      return data;
    } catch (error) {
      console.error(error);
    }
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
              <Link
                href={`http://ec2-43-203-40-200.ap-northeast-2.compute.amazonaws.com:8080/login/oauth2/code/google?redirect_uri=https://localhost:3000/login`}
              >
                <BigButton>
                  <AiOutlineGoogle />
                  <span>구글로 계속하기</span>
                </BigButton>
              </Link>
              <BigButton onClick={handleLogin}>
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
    </>
  );
};

export default LoginPage;
