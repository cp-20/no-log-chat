import { useAtom } from 'jotai';
import { atom } from 'jotai';
import { useCallback, useEffect, useRef } from 'react';
import { useMembersAtom } from '@/atoms/members';
import { timeline, useTimelineAtom } from '@/atoms/timeline';
import { useUsernameAtom } from '@/atoms/username';

const socketAtom = atom<WebSocket | null>(null);

export const useChat = () => {
  const [socket, setSocket] = useAtom(socketAtom);
  const { updateMembers } = useMembersAtom();
  const { addTimeline } = useTimelineAtom();
  const username = useUsernameAtom();
  const ping = useRef(false);

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
    (socket: WebSocket, username: string) => {
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
        if (payload.type === 'memberUpdate') {
          updateMembers(payload.data.members);
        }
      };

      socket.onopen = () => {
        console.log('connected', username);
        sendJoinMessage(username, socket);
      };
    },
    [addTimeline, sendJoinMessage, updateMembers],
  );

  const setupSocket = useCallback(
    (username: string) => {
      setSocket((socket) => {
        if (socket && socket.readyState !== socket.CLOSED) return socket;

        const newSocket = new WebSocket(
          process.env.NEXT_PUBLIC_API_SERVER as string,
        );

        socketHandler(newSocket, username);

        return newSocket;
      });
    },
    [setSocket, socketHandler],
  );

  useEffect(() => {
    const interval = setInterval(() => {
      // 前のpingが返ってきてなければ
      if (ping.current) {
        addTimeline({
          author: 'システム',
          text: `エラーが発生しました。再接続を試みています...`,
          ts: Date.now(),
        });

        console.log(socket?.readyState);

        socket?.close();
        setupSocket(username);
        ping.current = false;

        return;
      }

      socket?.send(
        JSON.stringify({
          type: 'ping',
        }),
      );
      ping.current = true;
      console.log('ping');
    }, 3 * 1000); // 3s

    return () => clearInterval(interval);
  }, [addTimeline, setupSocket, socket, username]);

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
      setupSocket(username);
    },
    [setupSocket],
  );

  return { sendMessage, join };
};
