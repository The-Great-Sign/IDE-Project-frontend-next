import useTokenStore from '@/store/useTokenStore';
import LoginSignUpLink from './LoginSignUpLink/LoginSignUpLink';
import { HeaderContainer, Logo } from './MainHeader.style';
import UserInfo from './UserInfo/UserInfo';
import useUserStore from '@/store/useUserStore';
import StyledLink from '../StyledLink/StyledLink';

const MainHeader = () => {
  const { isLoggedIn } = useTokenStore();
  const { name } = useUserStore();
  return (
    <>
      <HeaderContainer>
        <StyledLink href={'/'}>
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
