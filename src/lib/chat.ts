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
  const { pongHandler, setupPing } = usePing();

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
        console.log('connected', username);
        sendPacket(joinPacket(username));
      };
    },
    [addTimeline, pongHandler, sendPacket, updateMembers],
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
