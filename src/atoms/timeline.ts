import { atom, useAtom } from 'jotai';
import { useCallback } from 'react';
import { useNotification } from '@/lib/notification';

export type timeline = {
  author: string;
  text: string;
  ts: number;
};

export const TimelineAtom = atom<timeline[]>([]);
export const MESSAGE_LIMIT = 3;

export const useTimelineAtom = () => {
  const { notify } = useNotification();
  const [timeline, setTimeline] = useAtom(TimelineAtom);

  const addTimeline = useCallback(
    (data: timeline) => {
      setTimeline((timeline) => [data, ...timeline].filter((_, i) => i < 4));
      notify();
    },
    [notify, setTimeline],
  );

  return { timeline, addTimeline };
};
