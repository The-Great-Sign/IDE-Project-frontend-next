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

const Toolbar = () => {
  const user = { name: '지원' };
  const { toggleDiv } = useVisibleDiv();
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
            <AiOutlineShareAlt />
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
