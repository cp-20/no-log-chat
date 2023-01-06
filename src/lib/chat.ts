import { useAtom } from 'jotai';
import { useEffect, useState } from 'react';
import { TimelineAtom } from '@/components/atoms/timeline';

export const useChat = () => {
  const [socket, setSocket] = useState<WebSocket | null>(null);
  // eslint-disable-next-line no-unused-vars, @typescript-eslint/no-unused-vars
  const [_, setTimeline] = useAtom(TimelineAtom);

  useEffect(() => {
    if (!socket) {
      console.log(`ws://${location.hostname}:8000`);

      setSocket(new WebSocket(`ws://${location.hostname}:8000`));
    }
  }, [socket]);

  useEffect(() => {
    if (socket) {
      socket.onmessage = (res) => {
        const message = JSON.parse(res.data);
        if (message.type === 'message') {
          setTimeline((timeline) =>
            [...timeline, message.data].filter(
              (_, i, arr) => i >= arr.length - 3,
            ),
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
          author: 'someone',
          text: message,
          ts: Date.now(),
        },
      }),
    );
  };

  return { sendMessage };
};
