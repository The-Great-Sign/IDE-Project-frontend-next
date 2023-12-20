import { Client } from '@stomp/stompjs';
import SockJS from 'sockjs-client';

interface WebsocketProps {
  projectId: string;
  token: string;
}

export const testWebsocket: WebsocketProps = {
  projectId: '',
  token: '',
};

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

export default initializeWebSocket;
