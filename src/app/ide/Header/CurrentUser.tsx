import { UserAvatars } from '../Editor/Avatars';
import {
  RightBox,
  CurrentUserBox,
  StyleAiOutlineComment,
} from './IDEHeader.styles';

const CurrentUser = () => {
  return (
    <RightBox>
      <CurrentUserBox>
        <UserAvatars />
      </CurrentUserBox>
      <StyleAiOutlineComment />
    </RightBox>
  );
};

export default CurrentUser;
