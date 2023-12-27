import useTokenStore from '@/store/useTokenStore';
import LoginSignUpLink from './LoginSignUpLink/LoginSignUpLink';
import { HeaderContainer, Logo, StyledLink } from './MainHeader.style';
import UserInfo from './UserInfo/UserInfo';
import useUserStore from '@/store/useUserStore';

const MainHeader = () => {
  const { isLoggedIn } = useTokenStore();
  const { name } = useUserStore();
  return (
    <>
      <HeaderContainer>
        <StyledLink href="/">
          <Logo>DJIDE</Logo>
        </StyledLink>
        {isLoggedIn && name !== '로그인안됨' ? (
          <UserInfo />
        ) : (
          <LoginSignUpLink />
        )}
      </HeaderContainer>
    </>
  );
};

export default MainHeader;
