'use client';

import React from 'react';
import { IconContext } from 'react-icons';
import {
  AiOutlineApple,
  AiOutlineGithub,
  AiOutlineGoogle,
} from 'react-icons/ai';
import { ButtonBox, LoginBox, LoginConatiner, Logo } from './Login.style';
import { BigButton } from '../../components/Button/Button';
import axiosInstance from '../api/axiosInstance';
import useTokenStore from '../../store/useTokenStore';
import useUserStore from '../../store/useUserStore';
import { useRouter } from 'next/navigation';


const LoginPage = () => {
  const router = useRouter();

  const handleLogin = async () => {
    try {
      // const { data } = await axiosInstance.get('/oauth2/authorization/google');
      const { data } = await axiosInstance.post('/api/projects', {
        name: 'ProjectName',
        description: 'description',
        programmingLanguage: 'PYTHON',
        password: 'password',
      });

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
              <BigButton onClick={handleLogin}>
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
    </>
  );
};

export default LoginPage;
