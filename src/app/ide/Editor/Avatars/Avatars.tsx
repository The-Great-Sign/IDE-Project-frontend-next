import { useOthers, useSelf } from '@/liveblocks.config';

import { AvatarImage, Avatars, AvatarDiv } from './Avatars.styles';
import { COLORS } from '@/constants/colors';

export function UserAvatars() {
  const users = useOthers();
  const currentUser = useSelf();

  return (
    <Avatars>
      {users.map(({ connectionId, info }) => {
        return (
          <Other key={connectionId} picture={info.picture} name={info.name} />
        );
      })}

      {currentUser && (
        <div className="relative ml-8 first:ml-0">
          <Me picture={currentUser.info.picture} name={currentUser.info.name} />
        </div>
      )}
    </Avatars>
  );
}

export function Other({ picture, name }: { picture: string; name: string }) {
  return (
    <AvatarDiv data-tooltip={name}>
      <AvatarImage src={picture} alt="avatar" width={42} height={42} />
    </AvatarDiv>
  );
}

export function Me({ picture, name }: { picture: string; name: string }) {
  return (
    <AvatarDiv data-tooltip={name}>
      <AvatarImage
        src={picture}
        alt="avatar"
        width={42}
        height={42}
        style={{ border: `1.6px solid ${COLORS.primary}` }}
      />
    </AvatarDiv>
  );
}
