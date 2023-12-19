import { useOthers, useSelf } from '@/liveblocks.config';

import { AvatarImage, Avatars, AvatarDiv } from './Avatars.styles';

export function UserAvatars() {
  const users = useOthers();
  const currentUser = useSelf();

  return (
    <Avatars>
      {users.map(({ connectionId, info }) => {
        return (
          <Avatar key={connectionId} picture={info.picture} name={info.name} />
        );
      })}

      {currentUser && (
        <div className="relative ml-8 first:ml-0">
          <Avatar
            picture={currentUser.info.picture}
            name={currentUser.info.name}
          />
        </div>
      )}
    </Avatars>
  );
}

export function Avatar({ picture, name }: { picture: string; name: string }) {
  return (
    <AvatarDiv>
      <AvatarImage
        src={picture}
        data-tooltip={name}
        alt="avatar"
        width={42}
        height={42}
      />
    </AvatarDiv>
  );
}
