import { atom, useAtom } from 'jotai';

export type timeline = {
  author: string;
  text: string;
  ts: number;
};

export const TimelineAtom = atom<timeline[]>([]);

export const useTimelineAtom = () => {
  const [atom] = useAtom(TimelineAtom);
  return atom;
};
