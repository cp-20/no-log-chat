export type packet =
  | messagePacket
  | joinPacket
  | leftPacket
  | pingPacket
  | pongPacket
  | memberUpdatePacket;

export type messagePacket = {
  type: 'message';
  data: {
    author: string;
    text: string;
    ts: number;
  };
};

export const messagePacket = (username: string, content: string) => {
  const packet: messagePacket = {
    type: 'message',
    data: {
      author: username,
      text: content,
      ts: Date.now(),
    },
  };
  return JSON.stringify(packet);
};

export type joinPacket = {
  type: 'join';
  data: {
    author: string;
    ts: number;
  };
};

export const joinPacket = (username: string) => {
  const packet: joinPacket = {
    type: 'join',
    data: {
      author: username,
      ts: Date.now(),
    },
  };
  return JSON.stringify(packet);
};

export type leftPacket = {
  type: 'left';
  data: {
    author: string;
    ts: number;
  };
};

export const leftPacket = (username: string) => {
  const packet: leftPacket = {
    type: 'left',
    data: {
      author: username,
      ts: Date.now(),
    },
  };
  return JSON.stringify(packet);
};

export type pingPacket = {
  type: 'ping';
};

export const pingPacket = () => {
  const packet: pingPacket = {
    type: 'ping',
  };
  return JSON.stringify(packet);
};

export type pongPacket = {
  type: 'pong';
};

export type memberUpdatePacket = {
  type: 'memberUpdate';
  data: {
    members: string[];
  };
};
