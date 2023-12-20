import { SmallButton } from '@/components/Button/Button';
import StyledLink from '../../../styles/StyledLink';
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

const IDEHeader = () => {
  return (
    <IDEHeaderContainer>
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
