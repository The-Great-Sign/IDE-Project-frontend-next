import axiosInstance from '@/app/api/axiosInstance';
import LocalStorage from '@/utils/localstorage';
import { createClient } from '@liveblocks/client';
import { createRoomContext } from '@liveblocks/react';

const client = createClient({
  // publicApiKey: process.env.NEXT_PUBLIC_LIVEBLOCKS_PUBLIC_KEY!,
  authEndpoint: async (room) => {
    const response = await fetch("/api/liveblocks-auth", {
      method: "POST",
      headers: {
        Authentication: LocalStorage.getItem("accessToken"),
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ room }), // Don't forget to pass `room` down
    });
    return await response.json();
  },

    // const response = await fetch("/api/liveblocks-auth", {
    //   method: "POST",
    //   headers: {
    //     Authentication: LocalStorage.getItem("accessToken"),
    //     "Content-Type": "application/json",
    //   },
    //   body: JSON.stringify({ room }), // Don't forget to pass `room` down
    // });
    // return await response.json();
  },
});

// Presence represents the properties that will exist on every User in the Room
// and that will automatically be kept in sync. Accessible through the
// `user.presence` property. Must be JSON-serializable.
// eslint-disable-next-line @typescript-eslint/ban-types
type Presence = {};

// Optionally, Storage represents the shared document that persists in the
// Room, even after all Users leave. Fields under Storage typically are
// LiveList, LiveMap, LiveObject instances, for which updates are
// automatically persisted and synced to all connected clients.
// eslint-disable-next-line @typescript-eslint/ban-types
type Storage = {};

// Optionally, UserMeta represents static/readonly metadata on each User, as
// provided by your own custom auth backend (if used). Useful for data that
// will not change during a session, like a User's name or avatar.
// type UserMeta = {
//   id?: string,  // Accessible through `user.id`
//   info?: Json,  // Accessible through `user.info`
// };

// Optionally, the type of custom events broadcasted and listened for in this
// room. Must be JSON-serializable.
// type RoomEvent = {};

export const {
  suspense: { RoomProvider, useRoom, useOthers },
} = createRoomContext<Presence, Storage /* UserMeta, RoomEvent */>(client);
