import { useAtom } from 'jotai';
import { atom } from 'jotai';
import { useCallback, useEffect } from 'react';
import { timeline, TimelineAtom } from '@/atoms/timeline';
import { useUsernameAtom } from '@/atoms/username';
import { useNotification } from '@/lib/notification';

const socketAtom = atom<WebSocket | null>(null);
export const membersAtom = atom<string[]>([]);

export const useChat = () => {
  const { notify } = useNotification();

  const [socket, setSocket] = useAtom(socketAtom);
  const [_members, setMembers] = useAtom(membersAtom);
  const [_timeline, setTimeline] = useAtom(TimelineAtom);
  const username = useUsernameAtom();

  const addTimeline = useCallback(
    (data: timeline) => {
      setTimeline((timeline) => [data, ...timeline].filter((_, i) => i < 4));
      notify();
    },
    [notify, setTimeline],
  );

  useEffect(() => {
    const interval = setInterval(() => {
      socket?.send(
        JSON.stringify({
          type: 'ping',
        }),
      );
    }, 60 * 1000);

    return () => clearInterval(interval);
  }, [socket]);

  useEffect(() => {
    setSocket((socket) => {
      if (socket) return socket;
      return new WebSocket(process.env.NEXT_PUBLIC_API_SERVER as string);
    });
  }, [setSocket]);

  useEffect(() => {
    if (socket) {
      socket.onmessage = (res) => {
        const payload = JSON.parse(res.data);
        if (payload.type === 'message') {
          addTimeline(payload.data as timeline);
        }
        if (payload.type === 'join') {
          addTimeline({
            author: 'システム',
            text: `${payload.data.author} が参加しました`,
            ts: payload.data.ts,
          });
        }
        if (payload.type === 'left') {
          addTimeline({
            author: 'システム',
            text: `${payload.data.author} が帰りました`,
            ts: payload.data.ts,
          });
        }
        if (payload.type === 'memberUpdate') {
          setMembers(payload.data.members);
        }
      };
    }
  }, [addTimeline, setMembers, socket]);

  const sendMessage = (message: string) => {
    socket?.send(
      JSON.stringify({
        type: 'message',
        data: {
          author: username,
          text: message,
          ts: Date.now(),
        },
      }),
    );
  };

  const join = (username: string) => {
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
