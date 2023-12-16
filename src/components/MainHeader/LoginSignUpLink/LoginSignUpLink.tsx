import { LoginSignUpDiv } from "./LoginSignUpLink.style";
import StyledLink from "../../../styles/StyledLink";

const LoginSignUpLink = () => {
  return (
    <LoginSignUpDiv>
      <StyledLink to="/login">로그인</StyledLink>
      <StyledLink to="/signUp">회원가입</StyledLink>
    </LoginSignUpDiv>
  );
};

export default LoginSignUpLink;
