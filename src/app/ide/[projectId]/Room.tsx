'use client';

import { ReactNode } from 'react';
import { RoomProvider } from '@/liveblocks.config';
// import { useSearchParams } from 'next/navigation';
import { ClientSideSuspense } from '@liveblocks/react';
import { Loading } from '@/app/Loading';

export function Room({ children }: { children: ReactNode }) {
  // const roomId = useOverrideRoomId('nextjs-yjs-codemirror');
  // [TO DO] 각 룸 id에 각 unique projectId 넣어주기
  return (
    <RoomProvider
      id={'nextjs-yjs-codemirror'}
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

//   const overrideRoomId = useMemo(() => {
//     return roomIdParam ? `${roomId}-${roomIdParam}` : roomId;
//   }, [roomId, roomIdParam]);

//   return overrideRoomId;
// }
