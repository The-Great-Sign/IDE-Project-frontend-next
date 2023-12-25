'use client';

import { ReactNode } from 'react';
import { RoomProvider } from '@/liveblocks.config';
import { ClientSideSuspense } from '@liveblocks/react';
import { Loading } from '@/app/Loading';

export function Room({
  children,
  roomId,
}: {
  children: ReactNode;
  roomId: string;
}) {
  // Room ID를 파일 ID로 설정
  return (
    <RoomProvider
      id={`file-${roomId}`}
      initialPresence={{
        cursor: null,
      }}
    >
      <ClientSideSuspense fallback={<Loading />}>
        {() => children}
      </ClientSideSuspense>
    </RoomProvider>
  );
}

/**
 * This function is used when deploying an example on liveblocks.io.
 * You can ignore it completely if you run the example locally.
 */
// function useOverrideRoomId(roomId: string) {
//   const params = useSearchParams();
//   const roomIdParam = params.get('roomId');

// const overrideRoomId = useMemo(() => {
//   return roomIdParam ? `${roomId}-${roomIdParam}` : roomId;
// }, [roomId, roomIdParam]);

//   return overrideRoomId;
// }
