import useUserStore from '../../store/useUserStore';
import StyledLink from '../../styles/StyledLink';
import LoginSignUpLink from './LoginSignUpLink/LoginSignUpLink';
import { HeaderContainer, Logo } from './MainHeader.style';
import UserInfo from './UserInfo/UserInfo';
import React from 'react';

const MainHeader = () => {
  const { isLoggedIn } = useUserStore();

  return (
    <>
      <HeaderContainer>
        <Logo>DJIDE</Logo>
        <StyledLink
          href="/mypage"
          style={{ textDecoration: 'none', color: 'inherit' }}
        >
          {isLoggedIn ? <UserInfo /> : <LoginSignUpLink />}
        </StyledLink>
      </HeaderContainer>
    </>
  );
};

export default MainHeader;
