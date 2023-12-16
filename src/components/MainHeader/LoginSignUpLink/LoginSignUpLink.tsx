import { LoginSignUpDiv } from './LoginSignUpLink.style';
import StyledLink from '../../../styles/StyledLink';

const LoginSignUpLink = () => {
  return (
    <LoginSignUpDiv>
      <StyledLink href="/login">로그인</StyledLink>
      <StyledLink href="/signUp">회원가입</StyledLink>
    </LoginSignUpDiv>
  );
};

export default LoginSignUpLink;
