import {
  AiOutlineCopy,
  AiOutlineShareAlt,
  AiOutlineCode,
} from 'react-icons/ai';
import {
  Div,
  ToolBarIconDiv,
  ToolBarUserDiv,
  ToolbarContainer,
} from './Toolbar.style';
import { IconContext } from 'react-icons';
import { useVisibleDiv } from '@/store/useVisibleDiv';
import { getCurrentProjectId } from '../[projectId]/page';
import useUserStore from '@/store/useUserStore';

import { IMAGE_SIZE } from '@/constants/userInfo';
import {
  StyledImgDiv,
  StyledImage,
} from '@/components/MainHeader/UserInfo/UserInfo.style';

const Toolbar = () => {
  const imgageUrl = useUserStore.getState().imageUrl;
  const { toggleDiv } = useVisibleDiv();

  const shareURL = async () => {
    await navigator.clipboard
      .writeText(
        `${
          process.env.NEXT_PUBLIC_API_BASE_URL
        }/invite/${getCurrentProjectId()}`
      )
      .then(() => {
        alert('클립보드에 복사되었습니다.');
      })
      .catch(err => {
        console.error('복사 실패:', err);
        alert('링크 복사에 실패했습니다.');
      });
  };

  return (
    <ToolbarContainer>
      <IconContext.Provider
        value={{
          style: {
            width: '27px',
            height: '27px',
            margin: '0 0 15px 0',
          },
        }}
      >
        <Div>
          <ToolBarIconDiv onClick={toggleDiv}>
            <AiOutlineCopy />
          </ToolBarIconDiv>
          <ToolBarIconDiv>
            <AiOutlineCode />
          </ToolBarIconDiv>
        </Div>
        <Div>
          <ToolBarUserDiv>
            <StyledImgDiv>
              <StyledImage
                src={imgageUrl}
                alt={`프로필 이미지`}
                width={IMAGE_SIZE}
                height={IMAGE_SIZE}
              />
            </StyledImgDiv>
          </ToolBarUserDiv>
          <ToolBarIconDiv>
            <AiOutlineShareAlt onClick={shareURL} />
          </ToolBarIconDiv>
        </Div>
      </IconContext.Provider>
    </ToolbarContainer>
  );
};

export default Toolbar;
