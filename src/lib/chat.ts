import { useAtom } from 'jotai';
import { atom } from 'jotai';
import { useCallback, useEffect, useRef } from 'react';
import { timeline, TimelineAtom } from '@/atoms/timeline';
import { useUsernameAtom } from '@/atoms/username';
import { useNotification } from '@/lib/notification';

const socketAtom = atom<WebSocket | null>(null);

export const useChat = () => {
  const { notify } = useNotification();

  const [socket, setSocket] = useAtom(socketAtom);
  const [_, setTimeline] = useAtom(TimelineAtom);
  const username = useUsernameAtom();
  const ping = useRef(false);

  const addTimeline = useCallback(
    (data: timeline) => {
      setTimeline((timeline) => [data, ...timeline].filter((_, i) => i < 4));
      notify();
    },
    [notify, setTimeline],
  );

  const sendJoinMessage = useCallback((username: string, socket: WebSocket) => {
    socket?.send(
      JSON.stringify({
        type: 'join',
        data: {
          author: username,
          ts: Date.now(),
        },
      }),
    );
  }, []);

  const socketHandler = useCallback(
    (socket: WebSocket) => {
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
        if (payload.type === 'pong') {
          console.log('pong');

          ping.current = false;
        }
      };

      socket.onopen = () => {
        console.log('connected', username);

        if (username) {
          sendJoinMessage(username, socket);
        }
      };
    },
    [addTimeline, sendJoinMessage, username],
  );

  const setupSocket = useCallback(() => {
    setSocket((socket) => {
      if (socket && socket.readyState !== socket.CLOSED) return socket;

      const newSocket = new WebSocket(
        process.env.NEXT_PUBLIC_API_SERVER as string,
      );

      socketHandler(newSocket);

      return newSocket;
    });
  }, [setSocket, socketHandler]);

  useEffect(() => {
    const interval = setInterval(() => {
      // 前のpingが返ってきてなければ
      if (ping.current) {
        addTimeline({
          author: 'システム',
          text: `エラーが発生しました。再接続を試みています...`,
          ts: Date.now(),
        });

        socket?.close();
        setupSocket();
        ping.current = false;

        return;
      }

      ping.current = true;
      socket?.send(
        JSON.stringify({
          type: 'ping',
        }),
      );
      console.log('ping');
    }, 3 * 1000); // 3s

    return () => clearInterval(interval);
  }, [addTimeline, setupSocket, socket]);

  useEffect(() => {
    setupSocket();
  }, [setupSocket]);

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

  const join = useCallback(
    (username: string) => {
      if (socket) {
        sendJoinMessage(username, socket);
      }
    },
    [sendJoinMessage, socket],
  );

  return { sendMessage, join };
};
