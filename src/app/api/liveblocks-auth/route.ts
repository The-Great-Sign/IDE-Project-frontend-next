import { Liveblocks } from '@liveblocks/node';
import { NextRequest } from 'next/server';

import axios from 'axios';

const API_KEY = process.env.LIVEBLOCKS_SECRET_KEY;

const liveblocks = new Liveblocks({
  secret: API_KEY!,
});

export async function POST(request: NextRequest) {
  // 랜덤 라이브커서 색 생성
  const hex = '#' + Math.round(Math.random() * 0xffffff).toString(16);

  const accessToken = request.headers.get('Authorization');

  const result = await axios.get(
    `${process.env.NEXT_PUBLIC_BACKEND_URI}/user/info`,
    {
      headers: {
        Authorization: accessToken,
      },
    }
  );
  const { id, nickname, imageUrl } = result.data.results;

  const user = {
    id: String(id),
    info: {
      name: nickname,
      color: hex,
      picture: imageUrl,
    },
  };
  console.log(user);

  if (!user) {
    return new Response('Unauthorized', { status: 401 });
  }

  // Create a session for the current user
  // userInfo is made available in Liveblocks presence hooks, e.g. useOthers
  // Start an auth session inside your endpoint

  const session = liveblocks.prepareSession(user.id, {
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
