import { Flex } from '@mantine/core';
import { useTimelineAtom } from '@/atoms/timeline';
import { TimelineContent } from '@/components/Timeline/TimelineContent';
import Styles from '@/components/Timeline/timeline.module.scss';

export const Timeline: React.FC = () => {
  const { timeline } = useTimelineAtom();
  return (
    <Flex className={Styles.timeline} direction="column-reverse" gap="md">
      {timeline.map((content, i) => (
        <TimelineContent timeline={content} index={i} key={content.ts} />
      ))}
    </Flex>
  );
};
