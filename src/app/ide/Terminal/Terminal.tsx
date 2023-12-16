import { useState, useEffect, useRef } from 'react';
import SockJS from 'sockjs-client';
import { Client, IMessage } from '@stomp/stompjs';
import { Terminal as XTerm } from 'xterm';
import 'xterm/css/xterm.css';

interface Content {
  path: string;
  command: string;
}
const projectId = 1;

const Terminal = () => {
  const [currentPath, setCurrentPath] = useState<string>('/');
  const [commands, setCommands] = useState<string[]>([]);

  const terminalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const xterm: XTerm = new XTerm();

    if (terminalRef.current) {
      xterm.open(terminalRef.current); // 껍데기 생성
      xterm.write('/: ');
    }

    const client = new Client({
      // SockJS 라이브러리를 사용하여 웹 소켓 연결 시도
      webSocketFactory: () => new SockJS('ws://localhost:8080/ws/ide'),
      onConnect: () => {
        // 연결 성공 시 실행될 콜백 함수
        client.subscribe(
          `/queue/project/${projectId}/terminal`,
          (message: IMessage) => {
            // 구독
            const { path, command } = JSON.parse(message.body) as Content;
            if (command) {
              xterm.write(path + ': ' + command + '\r\n');
            }
            xterm.write(path + ': ');
            setCurrentPath(path);
            console.log(`path: ${path}, command: ${command}`);
          }
        );

        let currentCommand = '';
        xterm.onData(data => {
          // 키보드 입력 시 서버로 메시지 전송
          currentCommand += data;
          xterm.write(data); // 내 터미널에도 입력값 보여주기
        });

        xterm.onKey(keyEvent => {
          const { key } = keyEvent;

          if (key === '\r') {
            const content: Content = {
              path: currentPath,
              command: currentCommand,
            };
            client.publish({
              destination: `/app/project/${projectId}/terminal`,
              body: JSON.stringify(content),
            });
            setCommands(prevCommands => [...prevCommands, currentCommand]);
            console.log(commands);
            currentCommand = '';
          }
        });
      },

      onStompError: frame => {
        console.error('Broker reported error: ' + frame.headers['message']);
        console.error('Additional details: ' + frame.body);
      },
    });

    client.activate();

    return () => {
      // client.deactivate가 Promise를 반환한다면, async 함수 내에서 호출합니다.
      const deactivateClient = async () => {
        try {
          await client.deactivate();
        } catch (error) {
          console.error('Error deactivating client:', error);
        }
      };

      deactivateClient();
    };
  });

  return (
    <div
      ref={terminalRef}
      id="terminal-container"
      style={{ height: '100%', width: '100%' }}
    ></div>
  );
};

export default Terminal;
