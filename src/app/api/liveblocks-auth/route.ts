import { Liveblocks } from '@liveblocks/node';
import { NextRequest } from 'next/server';
import useUserStore from '@/store/useUserStore';

const API_KEY = process.env.LIVEBLOCKS_SECRET_KEY;

const liveblocks = new Liveblocks({
  secret: API_KEY!,
});

export async function POST(request: NextRequest) {
  // Get the current user's info from your database
  const { id, name, cursorColor } = useUserStore.getState();

  // 실제 데이터 들어오면 바꾸기
  const tempUserImageUrl = 'https://liveblocks.io/avatars/avatar-4.png';
  const user = {
    id,
    info: {
      name,
      color: cursorColor,
      picture: tempUserImageUrl,
    },
  };

  if (!user) {
    return new Response('Unauthorized', { status: 401 });
  }

  // Create a session for the current user
  // userInfo is made available in Liveblocks presence hooks, e.g. useOthers
  // Start an auth session inside your endpoint

  const session = liveblocks.prepareSession(`user.id`, {
    userInfo: user.info,
  });

  // Give the user access to the room
  // Implement your own security, and give the user access to the room
  const { room } = await request.json();
  session.allow(room, session.FULL_ACCESS);

  // Authorize the user and return the result
  const { body, status } = await session.authorize();
  return new Response(body, { status });
}
