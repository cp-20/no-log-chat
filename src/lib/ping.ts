import { atom, useAtom } from 'jotai';
import { useEffect } from 'react';
import { useSocketAtom, socketHandler } from '@/atoms/socket';
import { pingPacket } from '@/lib/packet';

export type errorHandler = socketHandler;

type handlers = {
  socketHandler: socketHandler;
  errorHandler: errorHandler;
};

const handlersAtom = atom<handlers | null>(null);
const pingAtom = atom(false);

export const usePing = () => {
  const [handlers, setHandlers] = useAtom(handlersAtom);
  const { socket, setupSocket, sendPacket } = useSocketAtom();
  const [ping, setPing] = useAtom(pingAtom);

  useEffect(() => {
    const interval = setInterval(() => {
      if (socket !== null && handlers !== null) {
        // 前のpingが返ってきてなければ
        if (ping) {
          handlers.errorHandler(socket);

          socket.close();
          setupSocket(handlers.socketHandler);
          setPing(false);

          return;
        }

        sendPacket(pingPacket());
        setPing(true);
      }
    }, 3 * 1000); // 3s

    return () => clearInterval(interval);
  }, [handlers, ping, sendPacket, setPing, setupSocket, socket]);

  const setupPing = (
    socketHandler: socketHandler,
    errorHandler: socketHandler,
  ) => {
    setHandlers({ socketHandler, errorHandler });
  };

  const pongHandler = () => {
    setPing(false);
  };

  const closeHandler = (socket: WebSocket) => {
    if (handlers !== null) {
      handlers.errorHandler(socket);
      setupSocket(handlers.socketHandler);
      setPing(false);
    }
  };

  return { pongHandler, setupPing, closeHandler };
};
