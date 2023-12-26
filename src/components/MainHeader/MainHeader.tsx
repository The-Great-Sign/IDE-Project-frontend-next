import useUserStore from '../../store/useUserStore';
import LoginSignUpLink from './LoginSignUpLink/LoginSignUpLink';
import { HeaderContainer, Logo } from './MainHeader.style';
import UserInfo from './UserInfo/UserInfo';

const MainHeader = () => {
  const { isLoggedIn } = useUserStore();
  return (
    <>
      <HeaderContainer>
        <Logo>DJIDE</Logo>
        {isLoggedIn ? <UserInfo /> : <LoginSignUpLink />}
      </HeaderContainer>
    </>
  );
};

export default MainHeader;
