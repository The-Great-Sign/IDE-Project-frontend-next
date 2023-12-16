import StyledLink from '../../../styles/StyledLink';
import CurrentUser from './CurrentUser';
import { IDEHeaderContainer, IDELogo } from './IDEHeader.style';

const IDEHeader = () => {
  return (
    <IDEHeaderContainer>
      <IDELogo>
        <StyledLink href="/">DJIDE</StyledLink>
      </IDELogo>
      <CurrentUser />
    </IDEHeaderContainer>
  );
};

export default IDEHeader;
