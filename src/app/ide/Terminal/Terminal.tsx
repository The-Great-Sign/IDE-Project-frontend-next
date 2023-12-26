'use client';
import { Resizable } from 're-resizable';
import { TerminalContainer } from './Terminal.styles';
import { useState, useEffect } from 'react';
import { Client } from '@stomp/stompjs';
import { Terminal as XTerm } from 'xterm';
import { getCurrentProjectId } from '../[projectId]/page';
import 'xterm/css/xterm.css';

export interface Content {
  path: string;
  command: string;
}

interface TerminalProps {
  clientRef: React.RefObject<Client>;
  terminalRef: React.RefObject<HTMLDivElement>;
  xtermRef: React.RefObject<XTerm>;
  currentPath: string;
}

const Terminal = ({
  clientRef,
  terminalRef,
  xtermRef,
  currentPath,
}: TerminalProps) => {
  const [commands, setCommands] = useState<string[]>([]);

  useEffect(() => {
    if (terminalRef.current && xtermRef.current) {
      xtermRef.current.write('/: ');
    }
  }, []);

  useEffect(() => {
    if (terminalRef.current && xtermRef.current) {
      let currentCommand = '';
      const TerminalDataHandler = xtermRef.current.onData(data => {
        console.log('data', data);
        if (data === '\r') {
          if (currentCommand === '' && xtermRef.current) {
            xtermRef.current.write('\r\n' + currentPath + ': ');
          } else {
            const content: Content = {
              path: currentPath,
              command: currentCommand,
            };
            console.log('content', content);
            if (clientRef.current) {
              clientRef.current.publish({
                destination: `/app/project/${getCurrentProjectId()}/terminal`,
                body: JSON.stringify(content),
              });
              setCommands(prevCommands => [...prevCommands, currentCommand]);
              console.log(commands);
              if (xtermRef.current) {
                xtermRef.current.write('\r\n');
              }
              currentCommand = '';
            }
          }
        } else if (data === '\x7f' || data === '\b') {
          // 백스페이스 키 처리
          if (currentCommand.length > 0) {
            // 현재 명령어에서 마지막 문자 제거
            currentCommand = currentCommand.slice(0, -1);
            // xterm에도 반영 (커서 한 칸 뒤로 이동, 공백으로 덮기, 다시 커서 한 칸 뒤로 이동)
            if (xtermRef.current) {
              xtermRef.current.write('\b \b');
            }
          }
        } else {
          // 키보드 입력 시 서버로 메시지 전송
          currentCommand += data;
          if (xtermRef.current) {
            xtermRef.current.write(data); // 내 터미널에도 입력값 보여주기
          }
        }
      });

      return () => {
        TerminalDataHandler.dispose();
      };
    }
  }, [currentPath, terminalRef, xtermRef]);

  return (
    <Resizable
      defaultSize={{
        height: '300px', // 초기 높이 설정
        width: '100%',
      }}
      enable={{
        top: true, // 위쪽으로만 리사이징 가능
        right: false,
        bottom: true,
        left: false,
        topRight: false,
        bottomRight: false,
        bottomLeft: false,
        topLeft: false,
      }}
    >
      <TerminalContainer>
        <div ref={terminalRef} style={{ height: '300px', width: '100%' }} />
      </TerminalContainer>
    </Resizable>
  );
};

export default Terminal;
