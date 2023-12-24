import { SmallButton } from '@/components/Button/Button';
import StyledLink from '@/components/StyledLink/StyledLink';
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
import { useFileStore } from '@/store/useFileStore';
import useProjectStore from '@/store/useProjectStore';
import { useFileTreeStore } from '@/store/useFileTreeStore';

const IDEHeader = () => {
  const { files, selectedFileId } = useFileStore();
  const projectId = useProjectStore.getState().currentProject.id;
  const { findNodePath } = useFileTreeStore();
  const handleSave = async () => {
    if (selectedFileId) {
      const selectedFile = files.find(f => f.id === selectedFileId);

      if (selectedFile) {
        const filePath = findNodePath(selectedFileId); // 전체 파일 경로 찾기
        if (filePath) {
          try {
            await axiosInstance.post('/api/files', {
              projectId: projectId,
              directories: null,
              files: filePath,
              content: selectedFile.content,
            });
            console.log('selectedFile.content: ', selectedFile.content);
            alert('파일이 저장되었습니다.');
          } catch (error) {
            console.error('파일 저장 중 오류 발생:', error);
            alert('파일 저장에 실패했습니다.');
          }
        }
      }
    }
  };

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
        <SmallButton
          onClick={handleSave}
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
        <StyleAiOutlineComment />
      </RightBox>
    </IDEHeaderContainer>
  );
};

export default IDEHeader;
