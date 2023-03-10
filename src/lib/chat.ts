import { useCallback } from 'react';
import { useMembersAtom } from '@/atoms/members';
import { socketHandler, useSocketAtom } from '@/atoms/socket';
import { useTimelineAtom } from '@/atoms/timeline';
import { useUsernameAtom } from '@/atoms/username';
import { joinPacket, messagePacket, packet } from '@/lib/packet';
import { usePing } from '@/lib/ping';
import { errorHandler } from '@/lib/ping';
import {
  connectionErrorMessage,
  joinMessage,
  leftMessage,
} from '@/lib/systemMessage';

export const useChat = () => {
  const username = useUsernameAtom();

  const { sendPacket, setupSocket } = useSocketAtom();
  const { updateMembers } = useMembersAtom();
  const { addTimeline } = useTimelineAtom();
  const { pongHandler, setupPing, closeHandler } = usePing();

  const socketHandler: (username: string) => socketHandler = useCallback(
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
          pongHandler();
        }
        if (packet.type === 'memberUpdate') {
          updateMembers(packet.data.members);
        }
      };

      socket.onopen = () => {
        // socketが更新される前に送信しようとするためsendPacketだと送れない → socket.sendで直接送る
        socket.send(joinPacket(username));
      };
      socket.onclose = () => closeHandler(socket);
      socket.onerror = () => closeHandler(socket);
    },
    [addTimeline, closeHandler, pongHandler, updateMembers],
  );

  const errorHandler: errorHandler = useCallback(() => {
    addTimeline(connectionErrorMessage());
  }, [addTimeline]);

  const sendMessage = useCallback(
    (message: string) => {
      sendPacket(messagePacket(username, message));
    },
    [sendPacket, username],
  );

  const join = useCallback(
    (username: string) => {
      setupSocket(socketHandler(username));
      setupPing(socketHandler(username), errorHandler);
    },
    [errorHandler, setupPing, setupSocket, socketHandler],
  );

  return { sendMessage, join };
};
