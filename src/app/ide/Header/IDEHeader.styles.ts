import styled from 'styled-components';
import { FONTS } from '@/constants/fonts';
import { AiOutlineComment } from 'react-icons/ai';
import { HeaderContainer } from '@/components/MainHeader/MainHeader.style';

export const IDEHeaderContainer = styled(HeaderContainer)`
  height: 48px;
  padding-top: 0px;
`;

export const LeftBox = styled.div`
  display: flex;
`;

export const IDELogo = styled.div`
  font-size: ${FONTS.lg};
  font-weight: 700;
`;

export const StyleAiOutlineComment = styled(AiOutlineComment)`
  padding-right: 20px;
  margin-left: 10px;
  cursor: pointer;
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
  margin: 10px;
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
