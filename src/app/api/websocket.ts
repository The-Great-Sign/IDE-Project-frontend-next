import useGeneralChatStore from '@/store/useChattingStore';
import useProjectStore from '@/store/useProjectStore';
import { Client, StompSubscription } from '@stomp/stompjs';
import SockJS from 'sockjs-client';

interface WebsocketProps {
  projectId: string;
  token: string;
}

interface StatusProps {
  containerId: string;
  status: 'PENDING' | 'RUNNING';
}

export const testWebsocket: WebsocketProps = {
  projectId: useProjectStore.getState().currentProject.id,
  token: '',
};

type SubscribeProps = StompSubscription | null;

export interface ChattingType {
  messageType: 'ENTER' | 'EXIT' | 'TALK';
  userNickname: string;
  content: string;
  currentUsers: number;
}

const initializeWebSocket = () => {
  const client = new Client({
    webSocketFactory: () =>
      new SockJS(
        `http://ec2-43-203-40-200.ap-northeast-2.compute.amazonaws.com:8080/ws/ide`
      ),
    connectHeaders: {
      Authorization: testWebsocket.token,
      ProjectId: testWebsocket.projectId,
    },
  });

  return client;
};

const subscribeLoading = (client: Client | null): SubscribeProps => {
  if (client) {
    return client.subscribe(
      `/topic/project/${testWebsocket.projectId}/container-loading`,
      ReceivedLoading => {
        const data = JSON.parse(ReceivedLoading.body) as StatusProps;
        useProjectStore.getState().setStatus(data.status);
        console.log(`Received: ${ReceivedLoading.body}`);
        console.log(useProjectStore.getState().status);
      }
    );
  }
  return null;
};

const subscribeChatting = (client: Client | null): SubscribeProps => {
  if (client) {
    return client.subscribe(
      `/topic/project/${testWebsocket.projectId}/chat`,
      ReceivedMessage => {
        const messageData = JSON.parse(ReceivedMessage.body) as ChattingType;

        useGeneralChatStore.getState().addMessage(messageData);
        console.log(`Received: ${ReceivedMessage.body}`);
      }
    );
  }
  return null;
};

const subscribeTerminal = (client: Client | null): SubscribeProps => {
  if (client) {
    return client.subscribe(
      `/user/queue/project/${testWebsocket.projectId}/terminal`,
      ReceivedTerminal => {
        console.log('terminal connected');
        console.log(`Received: ${ReceivedTerminal.body}`);
      }
    );
  }
  return null;
};

const subscribeFile = (client: Client | null): SubscribeProps => {
  if (client) {
    return client.subscribe(
      ` /topic/project/${testWebsocket.projectId}/file`,
      ReceivedFile => {
        console.log('file connected');
        console.log(`Received: ${ReceivedFile.body}`);
      }
    );
  }
  return null;
};

export {
  initializeWebSocket,
  subscribeLoading,
  subscribeChatting,
  subscribeTerminal,
  subscribeFile,
};
