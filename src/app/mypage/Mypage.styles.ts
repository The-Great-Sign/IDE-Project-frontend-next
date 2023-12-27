import { styled } from 'styled-components';

import { FONTS } from '@/constants/fonts';
import Image from 'next/image';
import { Button } from '@mui/material';

// 스타일 컴포넌트 정의
export const PageContainer = styled.div`
  width: 100wh;
  overflow: hidden;
  padding: 50px 50px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  color: ${props => props.theme.colors.text};
`;

export const TitleDiv = styled.div`
  margin-bottom: 20px;
  margin-top: 60px;
  marign-bottom: 30px;
`;

export const H2 = styled.h2`
  color: ${props => props.theme.colors.text};
`;

export const ProfileCard = styled.div`
  background-color: white;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  margin-top: 20px;
  padding: 50px 100px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 30vw;
  background: ${props => props.theme.colors.boxbg};
  border: ${props => props.theme.colors.text};
`;

export const Avatar = styled.div`
  width: 80px;
  height: 80px;
  margin: 10px 0 10px 0;
  border-radius: 50%;
  overflow: hidden;
`;

export const StyledImage = styled(Image)`
  width: 100%;
  height: 100%;
`;

export const UserInfo = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  width: 100%;
  margin-top: 40px;
`;

export const UserName = styled.div`
  margin-right: 15px;
  font-size: ${FONTS.md};
  color: ${props => props.theme.colors.text};
`;

export const StyledButton = styled(Button)`
  width: max-content;
  border: none;
  border-radius: 4px;
  padding: 5px 5px;
  cursor: pointer;
  background: ${props => props.theme.colors.primary} !important;
  color: white !important;

  &:hover {
    background:${props => props.theme.colors.primary}
    opacity: 0.5;
  }
`;

export const Stats = styled.div`
  margin-top: 30px;
  margin-bottom: 20px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

export const AccountInfo = styled.div`
  margin: 10px 0;
  color: ${props => props.theme.colors.text} !important;
`;
