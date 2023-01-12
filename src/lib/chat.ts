import { useCallback, useEffect, useRef } from 'react';
import { useMembersAtom } from '@/atoms/members';
import { useSocketAtom } from '@/atoms/socket';
import { useTimelineAtom } from '@/atoms/timeline';
import { useUsernameAtom } from '@/atoms/username';
import { joinPacket, messagePacket, packet, pingPacket } from '@/lib/packet';
import {
  connectionErrorMessage,
  joinMessage,
  leftMessage,
} from '@/lib/systemMessage';

export const useChat = () => {
  const { socket, sendPacket, setupSocket } = useSocketAtom();
  const { updateMembers } = useMembersAtom();
  const { addTimeline } = useTimelineAtom();
  const username = useUsernameAtom();
  const ping = useRef(false);

  const socketHandler = useCallback(
    (username: string) => (socket: WebSocket) => {
      socket.onmessage = (res) => {
        const packet = JSON.parse(res.data) as packet;
        if (packet.type === 'message') {
          addTimeline(packet.data);
        }
        if (packet.type === 'join') {
          addTimeline(joinMessage(packet));
        }
        if (packet.type === 'left') {
          addTimeline(leftMessage(packet));
        }
        if (packet.type === 'pong') {
          console.log('pong');

          ping.current = false;
        }
        if (packet.type === 'memberUpdate') {
          updateMembers(packet.data.members);
        }
      };

      socket.onopen = () => {
        console.log('connected', username);
        sendPacket(joinPacket(username));
      };
    },
    [addTimeline, sendPacket, updateMembers],
  );

  useEffect(() => {
    const interval = setInterval(() => {
      if (socket !== null) {
        // 前のpingが返ってきてなければ
        if (ping.current) {
          addTimeline(connectionErrorMessage());

          console.log(socket?.readyState);

          socket?.close();
          setupSocket(socketHandler(username));
          ping.current = false;

          return;
        }

        sendPacket(pingPacket());
        ping.current = true;
        console.log('ping');
      }
    }, 3 * 1000); // 3s

    return () => clearInterval(interval);
  }, [addTimeline, sendPacket, setupSocket, socket, socketHandler, username]);

  const sendMessage = (message: string) => {
    sendPacket(messagePacket(username, message));
  };

  const join = useCallback(
    (username: string) => {
      setupSocket(socketHandler(username));
    },
    [setupSocket, socketHandler],
  );

  return { sendMessage, join };
};
