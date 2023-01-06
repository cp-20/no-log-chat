import { atom, useAtom } from 'jotai';

export type timelineContent = {
  dummy: false;
  author: string;
  text: string;
  ts: number;
};

export type timelineDummy = {
  dummy: true;
  ts: number;
};

export type timeline = timelineContent | timelineDummy;

export const TimelineAtom = atom<timeline[]>([
  { dummy: true, ts: 1 },
  { dummy: true, ts: 2 },
  { dummy: true, ts: 3 },
]);

export const useTimelineAtom = () => {
  const [atom] = useAtom(TimelineAtom);
  return atom;
};
