import { atom } from 'jotai';
import { useAtom } from 'jotai';
import { useCallback } from 'react';

const socketAtom = atom<WebSocket | null>(null);

export const useSocketAtom = () => {
  const [socket, setSocket] = useAtom(socketAtom);

  const sendPacket = useCallback(
    (packet: string) => {
      if (socket !== null) {
        socket.send(packet);
      }
    },
    [socket],
  );

  const setupSocket = useCallback(
    (socketHandler: (socket: WebSocket) => void) => {
      setSocket((socket) => {
        if (socket && socket.readyState !== socket.CLOSED) return socket;

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
