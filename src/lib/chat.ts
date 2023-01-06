import { useAtom } from 'jotai';
import { atom } from 'jotai';
import { useEffect } from 'react';
import { TimelineAtom } from '@/atoms/timeline';
import { useUsernameAtom } from '@/atoms/username';

const socketAtom = atom<WebSocket | null>(null);

export const useChat = () => {
  const [socket, setSocket] = useAtom(socketAtom);
  const [_, setTimeline] = useAtom(TimelineAtom);
  const username = useUsernameAtom();

  useEffect(() => {
    setSocket((socket) => {
      if (socket) return socket;
      return new WebSocket(`ws://${location.hostname}:8000`);
    });
  }, [setSocket]);

  useEffect(() => {
    if (socket) {
      socket.onmessage = (res) => {
        const message = JSON.parse(res.data);
        if (message.type === 'message') {
          setTimeline((timeline) =>
            [message.data, ...timeline].filter((_, i) => i < 4),
          );
        }
      };
    }
  }, [setTimeline, socket]);

  const sendMessage = (message: string) => {
    socket?.send(
      JSON.stringify({
        type: 'message',
        data: {
          dummy: false,
          author: username,
          text: message,
          ts: Date.now(),
        },
      }),
    );
  };

  const join = () => {
    socket?.send(
      JSON.stringify({
        type: 'join',
        data: {
          author: username,
          ts: Date.now(),
        },
      }),
    );
  };

  return { sendMessage, join };
};
