import { UserAvatars } from '../Editor/Avatars';
import { CurrentUserBox } from './IDEHeader.styles';

const CurrentUser = () => {
  return (
    <CurrentUserBox>
      <UserAvatars />
    </CurrentUserBox>
  );
};

export default CurrentUser;
