import {
  AiOutlineCopy,
  AiOutlineShareAlt,
  AiOutlineSound,
  AiOutlineAudio,
  AiOutlineCode,
} from 'react-icons/ai';
import { BiMenu } from 'react-icons/bi';
import {
  Div,
  ToolBarIconDiv,
  ToolBarMenuDiv,
  ToolBarUserDiv,
  ToolbarContainer,
} from './Toolbar.style';
import { IconContext } from 'react-icons';
import { UserProfile } from '../Header/IDEHeader.styles';
import { useVisibleDiv } from '@/store/useVisibleDiv';
import { getCurrentProjectId } from '../[projectId]/page';

const Toolbar = () => {
  const user = { name: '지원' };
  const { toggleDiv } = useVisibleDiv();

  const shareURL = async () => {
    await navigator.clipboard
      .writeText(
        `${process.env.NEXT_PUBLIC_BACKEND_URI}/invite/${getCurrentProjectId()}`
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
          <ToolBarMenuDiv>
            <BiMenu />
          </ToolBarMenuDiv>
          <ToolBarIconDiv onClick={toggleDiv}>
            <AiOutlineCopy />
          </ToolBarIconDiv>
          <ToolBarIconDiv>
            <AiOutlineCode />
          </ToolBarIconDiv>
        </Div>
        <Div>
          <ToolBarIconDiv>
            <AiOutlineShareAlt onClick={shareURL} />
          </ToolBarIconDiv>
          <ToolBarIconDiv>
            <AiOutlineSound />
          </ToolBarIconDiv>
          <ToolBarIconDiv>
            <AiOutlineAudio />
          </ToolBarIconDiv>
          <ToolBarUserDiv>
            <UserProfile>{user.name}</UserProfile>
          </ToolBarUserDiv>
        </Div>
      </IconContext.Provider>
    </ToolbarContainer>
  );
};

export default Toolbar;
