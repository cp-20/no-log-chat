import { Flex } from '@mantine/core';
import { useTimelineAtom } from '@/atoms/timeline';
import { TimelineContent } from '@/components/Timeline/TimelineContent';
import Styles from '@/components/Timeline/timeline.module.scss';

export const Timeline: React.FC = () => {
  const timelines = useTimelineAtom();
  return (
    <Flex className={Styles.timeline} direction="column-reverse" gap="md">
      {timelines.map((timeline, i) => (
        <TimelineContent timeline={timeline} index={i} key={timeline.ts} />
      ))}
    </Flex>
  );
};
