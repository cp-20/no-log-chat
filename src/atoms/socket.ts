import { atom } from 'jotai';
import { useAtom } from 'jotai';
import { useCallback } from 'react';

const socketAtom = atom<WebSocket | null>(null);

export type socketHandler = (socket: WebSocket) => void;

export const useSocketAtom = () => {
  const [socket, setSocket] = useAtom(socketAtom);

  const sendPacket = useCallback(
    (packet: string) => {
      if (socket !== null) {
        socket.send(packet);
      } else {
        console.error('failed to set packet');
      }
    },
    [socket],
  );

  const setupSocket = useCallback(
    (socketHandler: socketHandler) => {
      setSocket((socket) => {
        if (
          socket &&
          [WebSocket.OPEN, WebSocket.CONNECTING].includes(socket.readyState)
        )
          return socket;

        const newSocket = new WebSocket(
          process.env.NEXT_PUBLIC_API_SERVER as string,
        );

        socketHandler(newSocket);

        return newSocket;
      });
    },
    [setSocket],
  );

  return { socket, sendPacket, setupSocket };
};
