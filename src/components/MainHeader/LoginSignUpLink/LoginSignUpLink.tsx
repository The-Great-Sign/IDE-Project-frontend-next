import { LoginSignUpDiv } from './LoginSignUpLink.style';
import StyledLink from '@/components/StyledLink/StyledLink';
import React from 'react';

const LoginSignUpLink = () => {
  return (
    <LoginSignUpDiv>
      <StyledLink href="/login">로그인</StyledLink>
      <StyledLink href="/signUp">회원가입</StyledLink>
    </LoginSignUpDiv>
  );
};

export default LoginSignUpLink;
