import { IMAGE_SIZE } from '@/constants/userInfo';
import styled from 'styled-components';
import Image from 'next/image';
import { FONTS_WEIGHT } from '@/constants/fonts';

export const UserInfoDiv = styled.div`
  display: flex;
  gap: 10px;
  align-items: center;
  word-break: keep-all;
  justify-content: space-between;
  padding-right: 60px;
`;

export const UserName = styled.p`
  cursor: pointer;
  font-size: 1rem;
  font-weight: 600;
`;

export const UserProfileImg = styled.div`
  width: 40px;
  height: 40px;
  border-radius: 20px;
  cursor: pointer;
`;

export const StyledImage = styled(Image)`
  width: ${IMAGE_SIZE}px;
  height: ${IMAGE_SIZE}px;
`;

export const StyledLogout = styled.div`
  font-weight: ${FONTS_WEIGHT.medium};
  font-size: 0.8rem;
  cursor: pointer;
`;

export const StyledImgDiv = styled.div`
  border-radius: 50%;
  overflow: hidden;
  width: ${IMAGE_SIZE}px;
  height: ${IMAGE_SIZE}px;
`;
