import { useFileTreeStore } from '@/store/useFileTreeStore';
import useTokenStore from '@/store/useTokenStore';
import { Client, StompSubscription } from '@stomp/stompjs';
import SockJS from 'sockjs-client';
import { useGeneralChatStore } from '@/store/useChattingStore';

const getCurrentProjectId = () => {
  if (typeof window !== 'undefined') {
    const path = window.location.pathname;
    const pathSegments = path.split('/');
    const projectId = pathSegments[2];
    return projectId;
  }
  return '';
};

interface WebsocketProps {
  projectId: string;
  token: string;
}

export const testWebsocket: WebsocketProps = {
  projectId: getCurrentProjectId(),
  token: useTokenStore.getState().accessToken,
};

export type SubscribeProps = StompSubscription | null;

export interface LoadingStatusProps {
  containerId: string;
  status: 'PENDING' | 'RUNNING';
}

export interface ChattingType {
  messageType: 'ENTER' | 'EXIT' | 'TALK';
  userNickname: string;
  content: string;
  currentUsers: number;
}

export interface FileSocketReceivedType {
  event: string;
  path: string;
  type: 'FILE' | 'DIRECTORY';
  fileId: number;
}

const initializeWebSocket = () => {
  const client = new Client({
    webSocketFactory: () =>
      new SockJS(`${process.env.NEXT_PUBLIC_BACKEND_URI}/ws/ide`),
    connectHeaders: {
      Authorization: testWebsocket.token,
      ProjectId: getCurrentProjectId(),
    },
  });
  console.log('새로운 클라이언트', client);
  return client;
};

const subscribeChatting = (
  client: Client | null,
  projectId: string
): SubscribeProps => {
  if (client) {
    return client.subscribe(
      `/topic/project/${projectId}/chat`,
      ReceivedMessage => {
        const messageData = JSON.parse(ReceivedMessage.body) as ChattingType;

        useGeneralChatStore.getState().addMessage(messageData);
        useGeneralChatStore.getState().setUsers(messageData.currentUsers);
        console.log(`Received: ${ReceivedMessage.body}`);
      }
    );
  }
  return null;
};

const subscribeFile = (
  client: Client | null,
  projectId: string
): SubscribeProps => {
  if (client) {
    return client.subscribe(
      `/topic/project/${projectId}/file`,
      ReceivedFile => {
        console.log('file connected');
        console.log(`Received: ${ReceivedFile.body}`);
        const fileData: FileSocketReceivedType = JSON.parse(ReceivedFile.body);
        useFileTreeStore.getState().handleWebSocketFileEvent(fileData);
      }
    );
  }
  return null;
};

export { initializeWebSocket, subscribeChatting, subscribeFile };
