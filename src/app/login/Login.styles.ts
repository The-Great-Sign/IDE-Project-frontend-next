import styled from 'styled-components';

export const LoginConatiner = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
  margin: 0 auto;
  text-align: center;
  height: 100vh;
`;
export const LoginBox = styled.div`
  width: 600px;
  color: ${props => props.theme.colors.loginTitle};
  background: ${props => props.theme.colors.headerBg};
  box-shadow:
    0 1px 1px rgba(128, 128, 128, 0.15),
    0 2px 2px rgba(128, 128, 128, 0.15),
    0 4px 4px rgba(128, 128, 128, 0.15),
    0 8px 8px rgba(128, 128, 128, 0.15);
  border-radius: 10px;
  padding: 2rem 0;
`;

export const Logo = styled.h1`
  margin: -10rem 0 0 0;
  margin-bottom: 3rem;
`;

export const ButtonBox = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin-bottom: 40px;
  margin-top: 40px;
`;
