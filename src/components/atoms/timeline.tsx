import { atom, useAtom } from 'jotai';

type timelineContent = {
  author: string;
  text: string;
  ts: number;
};

export const TimelineAtom = atom<timelineContent[]>([
  {
    author: 'cp20',
    text: 'lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem',
    ts: Date.now(),
  },
  {
    author: 'cp20',
    text: 'lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem',
    ts: Date.now(),
  },
  {
    author: 'cp20',
    text: 'lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem',
    ts: Date.now(),
  },
]);

export const useTimelineAtom = () => {
  const [atom] = useAtom(TimelineAtom);
  return atom;
};
