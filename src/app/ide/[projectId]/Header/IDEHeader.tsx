'use client';
import { SmallButton } from '@/components/Button/Button';
import StyledLink from '@/components/StyledLink/StyledLink';
import CurrentUser from './CurrentUser';
import {
  IDEBtnDiv,
  IDEHeaderContainer,
  IDELogo,
  RightBox,
  StyleAiOutlineComment,
} from './IDEHeader.styles';
import { FaPlay } from 'react-icons/fa6';
import { FaCheckCircle } from 'react-icons/fa';
import axiosInstance from '@/app/api/axiosInstance';
// import useProjectStore from '@/store/useProjectStore';

const IDEHeader = () => {
  const getCurrentProjectId = () => {
    const path = window.location.pathname;
    const pathSegments = path.split('/');
    const projectId = pathSegments[2];
    return projectId;
  };

  const projectId = getCurrentProjectId();

  const handleClose = async () => {
    try {
      await axiosInstance.post(`/api/projects/${projectId}/stop`);
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <IDEHeaderContainer>
      <StyledLink onClick={handleClose} href="/project">
        뒤로가기
      </StyledLink>
      <IDELogo>
        <StyledLink href="/">DJIDE</StyledLink>
      </IDELogo>
      <IDEBtnDiv>
        <SmallButton aria-label="save" variant="contained" size="small">
          <FaCheckCircle />
          저장
        </SmallButton>
        <SmallButton aria-label="run code" variant="contained" size="small">
          <FaPlay />
          실행
        </SmallButton>
      </IDEBtnDiv>
      <RightBox>
        <CurrentUser />
        <StyleAiOutlineComment />
      </RightBox>
    </IDEHeaderContainer>
  );
};

export default IDEHeader;
