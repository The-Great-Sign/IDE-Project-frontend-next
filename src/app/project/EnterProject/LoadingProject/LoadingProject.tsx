import React, { useEffect, useRef } from 'react';
// import styles from './LoadingProject.module.css';
import { Client, StompSubscription } from '@stomp/stompjs';
import { initializeWebSocket, subscribeLoading } from '@/app/api/websocket';
import useProjectStore from '@/store/useProjectStore';

// interface LoadingProjectProps {
//   width?: string;
//   height?: string;
// }

// const [cRef, setCRef] = useState<Client | null>(null);
const LoadingProject = () => {
  const clientRef = useRef<Client | null>(null);
  const subLoadingRef = useRef<StompSubscription | null>(null);
  useEffect(() => {
    if (clientRef.current == null) {
      clientRef.current = initializeWebSocket();
    }

    const client = clientRef.current;
    let subLoading = subLoadingRef.current;
    if (client) {
      client.onConnect = () => {
        subLoading = subscribeLoading(client);
        //   client.onStompError = frame => {
        //     console.error('WebSocket Error:', frame);
        //   };
      };
      client.activate();
      useProjectStore.getState().setClient(client);
    }

    return () => {
      if (subLoading) {
        subLoading.unsubscribe();
      }
    };
  }, []);

  return (
    <div>로딩중입니다. 약 40초 정도 소요됩니다</div>
    // <div>
    //   <div
    //     className={`${width ?? 'w-[48px]'} ${height ?? 'h-[48px]'} ${
    //       styles.loader
    //     }`}
    //   ></div>
    //   <div>로딩중입니다. 약 40초 정도 소요됩니다</div>
    // </div>
  );
};

export default LoadingProject;
