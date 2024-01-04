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
