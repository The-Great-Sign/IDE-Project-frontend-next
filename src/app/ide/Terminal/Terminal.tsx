'use client';
import { useState, useEffect } from 'react';
import { Client } from '@stomp/stompjs';
import { Terminal as XTerm } from 'xterm';
import { getCurrentProjectId } from '../[projectId]/page';
import 'xterm/css/xterm.css';
import { Resizable } from 're-resizable';
import { TerminalContainer } from './Terminal.styles';

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
    <Resizable
      defaultSize={{
        height: '300px',
        width: '100%',
      }}
      enable={{
        top: true,
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
