import React, { createContext, useContext } from 'react';

type timelineContent = {
  author: string;
  text: string;
  ts: number;
};

const TimelineContext = createContext<timelineContent[]>([
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

export const useTimelineContext = () => {
  const context = useContext(TimelineContext);
  return context;
};

type Props = { children: React.ReactNode; value: timelineContent[] };

export const TimelineContextProvider: React.FC<Props> = ({
  children,
  value,
}) => {
  return (
    <TimelineContext.Provider value={value}>
      {children}
    </TimelineContext.Provider>
  );
};
