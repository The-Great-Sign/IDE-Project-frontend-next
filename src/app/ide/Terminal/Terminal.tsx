'use client';
import { useEffect } from 'react';
import { Client } from '@stomp/stompjs';
import { Terminal as XTerm } from 'xterm';

import 'xterm/css/xterm.css';
import { TerminalContainer } from './Terminal.styles';
import { getCurrentProjectId } from '@/app/api/websocket';

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
  useEffect(() => {
    if (terminalRef.current && xtermRef.current) {
      xtermRef.current.write('/: ');
    }
  }, []);

  useEffect(() => {
    if (terminalRef.current && xtermRef.current) {
      let currentCommand = '';
      const TerminalDataHandler = xtermRef.current.onData(data => {
        if (data === '\r') {
          if (currentCommand === '' && xtermRef.current) {
            xtermRef.current.write('\r\n' + currentPath + ': ');
          } else {
            const content: Content = {
              path: currentPath,
              command: currentCommand,
            };
            if (clientRef.current) {
              clientRef.current.publish({
                destination: `/app/project/${getCurrentProjectId()}/terminal`,
                body: JSON.stringify(content),
              });
              if (xtermRef.current) {
                xtermRef.current.write('\r\n');
              }
              currentCommand = '';
            }
          }
        } else if (data === '\x7f' || data === '\b') {
          if (currentCommand.length > 0) {
            currentCommand = currentCommand.slice(0, -1);
            if (xtermRef.current) {
              xtermRef.current.write('\b \b');
            }
          }
        } else {
          currentCommand += data;
          if (xtermRef.current) {
            xtermRef.current.write(data);
          }
        }
      });

      return () => {
        TerminalDataHandler.dispose();
      };
    }
  }, [currentPath, terminalRef, xtermRef]);

  return (
    <TerminalContainer>
      <div ref={terminalRef} style={{ height: '300px', width: '100%' }} />
    </TerminalContainer>
  );
};

export default Terminal;
