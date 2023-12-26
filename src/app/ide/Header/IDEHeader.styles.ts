import styled from 'styled-components';
import { FONTS } from '@/constants/fonts';
import { AiOutlineComment } from 'react-icons/ai';
import {
  HeaderContainer,
  Logo,
} from '@/components/MainHeader/MainHeader.style';

export const IDEHeaderContainer = styled(HeaderContainer)`
  height: 48px;
  padding-top: 0px;
`;

export const IDEBack = styled.button``;

export const IDELogo = styled(Logo)`
  font-size: ${FONTS.lg};
`;

export const StyleAiOutlineComment = styled(AiOutlineComment)`
  padding-right: 20px;
  width: 50px;
  height: 50px;
  margin-left: 10px;
`;

export const RightBox = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;

export const CurrentUserBox = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  margin: 0 10px;
`;

export const UserProfile = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 28px;
  height: 28px;
  margin: 0 4px;
  border-radius: 50%;
  background: pink;
  font-size: ${FONTS.xs};
  overflow: hidden;
`;

export const IDEBtnDiv = styled.div`
  display: flex;
  gap: 15px;
`;
