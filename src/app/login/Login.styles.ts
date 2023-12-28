import { BigButton } from '@/components/Button/Button';
import styled from 'styled-components';
import Image from 'next/image';

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
  background: ${props => props.theme.colors.boxbg};
  color: ${props => props.theme.colors.text};
  border : 1px solid ${props => props.theme.colors.headerBg}
  box-shadow:
    0 1px 1px rgba(128, 128, 128, 0.15),
    0 2px 2px rgba(128, 128, 128, 0.15),
    0 4px 4px rgba(128, 128, 128, 0.15),
    0 8px 8px rgba(128, 128, 128, 0.15);
  border-radius: 10px;
  padding: 2rem 0;
`;

export const Logo = styled.h1`
  margin: -5rem 0 0 0;
  margin-bottom: 0;
`;

export const ButtonBox = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin-bottom: 40px;
  margin-top: 40px;
`;

export const KaKaoButton = styled(BigButton)`
  background: #fee500 !important;
  color: black !important;
  &:hover {
    background: #ffed4c !important;
  }
`;

export const AppleButton = styled(BigButton)`
  background: ${props => props.theme.colors.text} !important;
  border: 1px solid #000;
`;

export const StyledImage = styled(Image)`
  margin-right: 5px;
`;
