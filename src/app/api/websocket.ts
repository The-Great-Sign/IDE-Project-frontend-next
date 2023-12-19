import { Client } from '@stomp/stompjs';
import SockJS from 'sockjs-client';

interface WebsocketProps {
  projectId: string;
  token: string;
}

const initializeWebSocket = (props: WebsocketProps) => {
  const { projectId, token } = props;

  const client = new Client({
    webSocketFactory: () =>
      new SockJS(
        `http://ec2-43-203-40-200.ap-northeast-2.compute.amazonaws.com:8080/ws/ide`
      ),
    connectHeaders: {
      Authorization: token,
      ProjectId: projectId,
    },
  });

  return client;
};

export default initializeWebSocket;
