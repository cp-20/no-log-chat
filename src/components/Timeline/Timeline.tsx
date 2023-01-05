import { Stack, Text } from '@mantine/core';
import Styles from './timeline.module.scss';
import { useTimelineContext } from '@/components/contexts/timeline';

export const Timeline: React.FC = () => {
  const timelineContents = useTimelineContext();
  return (
    <Stack>
      {timelineContents.map((timelineContent) => (
        <div key={timelineContent.ts} className={Styles['timeline-content']}>
          <Text fw="bold" color="dark">
            {timelineContent.author}
          </Text>
          <Text>{timelineContent.text}</Text>
        </div>
      ))}
    </Stack>
  );
};
