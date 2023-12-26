import useGeneralChatStore from '@/store/useChattingStore';
import useProjectStore from '@/store/useProjectStore';
import useTokenStore from '@/store/useTokenStore';
import { Client, StompSubscription } from '@stomp/stompjs';
import SockJS from 'sockjs-client';

interface WebsocketProps {
  projectId: string;
  token: string;
}

export const testWebsocket: WebsocketProps = {
  projectId: useProjectStore.getState().currentProject.id,
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

const getCurrentProjectId = () => {
  const path = window.location.pathname;
  const pathSegments = path.split('/');
  const projectId = pathSegments[2];
  return projectId;
};

const initializeWebSocket = () => {
  const client = new Client({
    webSocketFactory: () =>
      new SockJS(
        `http://ec2-43-203-40-200.ap-northeast-2.compute.amazonaws.com:8080/ws/ide`
      ),
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
      }
    );
  }
  return null;
};

export { initializeWebSocket, subscribeChatting, subscribeFile };
