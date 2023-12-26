import { Liveblocks } from '@liveblocks/node';
import { NextRequest } from 'next/server';

import axios from 'axios';

const API_KEY = process.env.LIVEBLOCKS_SECRET_KEY;

const liveblocks = new Liveblocks({
  secret: API_KEY!,
});

// localStorage에 저장된 Authorization 값을 요청시 가져오기
// 프론트단에서 가지고 있는 고유한 토큰값을 서버단에서 사용 가능
// request -> body, headers 등에 Authorization 담아 보내기
// = 서버에 토큰을 보내준다!

export async function POST(request: NextRequest) {
  const result = await axios.get(
    `${process.env.NEXT_PUBLIC_BACKEND_URI}/user/info`,
    {
      headers: {
        Authorization:
          'Bearer eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJyYWNoZWwudWl1eEBnbWFpbC5jb20iLCJyb2xlIjoiUk9MRV9VU0VSIiwiZXhwIjoxNzAzNTgyMDU1fQ.1uJOxOU0JdLTyR9koNtoYvLZTZ6h-yhhDJa3fG32Iz8',
      },
    }
  );
  const { id, nickname, imageUrl } = result.data.results;

  const user = {
    id: String(id),
    info: {
      name: nickname,
      color: '#fff',
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
