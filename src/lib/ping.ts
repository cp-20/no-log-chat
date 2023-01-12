import { atom, useAtom } from 'jotai';
import { useEffect, useRef } from 'react';
import { useSocketAtom, socketHandler } from '@/atoms/socket';
import { pingPacket } from '@/lib/packet';

export type errorHandler = socketHandler;

type handlers = {
  socketHandler: socketHandler;
  errorHandler: errorHandler;
};

const handlersAtom = atom<handlers | null>(null);

export const usePing = () => {
  const [handlers, setHandlers] = useAtom(handlersAtom);
  const { socket, setupSocket, sendPacket } = useSocketAtom();
  const ping = useRef(false);

  useEffect(() => {
    const interval = setInterval(() => {
      if (socket !== null && handlers !== null) {
        // 前のpingが返ってきてなければ
        if (ping.current) {
          handlers.errorHandler(socket);

          socket.close();
          setupSocket(handlers.socketHandler);
          ping.current = false;

          return;
        }

        sendPacket(pingPacket());
        ping.current = true;
        console.log('ping');
      }
    }, 3 * 1000); // 3s

    return () => clearInterval(interval);
  }, [handlers, sendPacket, setupSocket, socket]);

  const setupPing = (
    socketHandler: socketHandler,
    errorHandler: socketHandler,
  ) => {
    setHandlers({ socketHandler, errorHandler });
  };

  const pongHandler = () => {
    ping.current = false;
  };

  const closeHandler = (socket: WebSocket) => {
    console.log('close', socket, handlers);

    if (handlers !== null) {
      handlers.errorHandler(socket);
      setupSocket(handlers.socketHandler);
      ping.current = false;
    }
  };

  return { pongHandler, setupPing, closeHandler };
};
