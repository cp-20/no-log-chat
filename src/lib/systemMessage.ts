import { timeline } from '@/atoms/timeline';
import { joinPacket, leftPacket } from '@/lib/packet';

export const joinMessage = (packet: joinPacket) => {
  const message: timeline = {
    author: 'システム',
    text: `${packet.data.author} が参加しました`,
    ts: packet.data.ts,
  };
  return message;
};

export const leftMessage = (packet: leftPacket) => {
  const message: timeline = {
    author: 'システム',
    text: `${packet.data.author} が帰りました`,
    ts: packet.data.ts,
  };
  return message;
};

export const connectionErrorMessage = () => {
  const message: timeline = {
    author: 'システム',
    text: `エラーが発生しました。再接続を試みています...`,
    ts: Date.now(),
  };
  return message;
};
