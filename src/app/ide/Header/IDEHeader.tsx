'use client';

import { ExitBtn, SmallButton } from '@/components/Button/Button';
import StyledLink from '@/components/StyledLink/StyledLink';
import {
  IDEBtnDiv,
  IDEHeaderContainer,
  IDELogo,
  LeftBox,
  RightBox,
  StyleAiOutlineComment,
} from './IDEHeader.styles';
import { FaPlay } from 'react-icons/fa6';
import { FaCheckCircle } from 'react-icons/fa';
import axiosInstance from '@/app/api/axiosInstance';
// import { useFileStore } from '@/store/useFileStore';
// import { useFileTreeStore } from '@/store/useFileTreeStore';
import { Client } from '@stomp/stompjs';
import { getCurrentProjectId } from '../[projectId]/page';
import { useVisibleChat } from '@/store/useChattingStore';

interface IDEHeaderProps {
  clientRef: React.RefObject<Client>;
}

const IDEHeader: React.FC<IDEHeaderProps> = ({ clientRef }) => {
  const { toggleChat } = useVisibleChat();
  // const { files, selectedFileId } = useFileStore();
  // const { findNodePath } = useFileTreeStore();

  // [TO DO] 구현 필요
  // const handleSave = async () => {
  //   if (selectedFileId) {
  //     const selectedFile = files.find(f => f.id === selectedFileId);

  //     if (selectedFile) {
  //       const filePath = findNodePath(selectedFileId); // 전체 파일 경로 찾기
  //       if (filePath) {
  //         try {
  //           await axiosInstance.post('/api/v2/files', {
  //             // fileId 제대로 받아오기
  //             fileId,
  //             path: filePath,
  //             content: selectedFile.content,
  //           });
  //           console.log('selectedFile.content: ', selectedFile.content);
  //           alert('파일이 저장되었습니다.');
  //         } catch (error) {
  //           console.error('파일 저장 중 오류 발생:', error);
  //           alert('파일 저장에 실패했습니다.');
  //         }
  //       }
  //     }
  //   }
  // };

  const handleClose = async () => {
    const confirmClose = confirm('프로젝트를 종료하시겠습니까?');
    if (confirmClose) {
      try {
        await axiosInstance.post(`/api/projects/${getCurrentProjectId()}/stop`);
        console.log('프로젝트 종료');
        if (clientRef.current) {
          clientRef.current.deactivate();
          window.location.href = '/project';
        }
      } catch (e) {
        console.error(e);
      }
    }
  };

  return (
    <IDEHeaderContainer>
      <LeftBox>
        <ExitBtn onClick={handleClose} href="#" size="small">
          🅧
        </ExitBtn>
        <IDELogo>
          <StyledLink href="/">DJIDE</StyledLink>
        </IDELogo>
      </LeftBox>
      <IDEBtnDiv>
        <SmallButton
          // onClick={handleSave}
          aria-label="save"
          variant="contained"
          size="small"
        >
          <FaCheckCircle />
          저장
        </SmallButton>
        <SmallButton aria-label="run code" variant="contained" size="small">
          <FaPlay />
          실행
        </SmallButton>
      </IDEBtnDiv>
      <RightBox>
        <StyleAiOutlineComment onClick={toggleChat} size={30} />
      </RightBox>
    </IDEHeaderContainer>
  );
};

export default IDEHeader;
