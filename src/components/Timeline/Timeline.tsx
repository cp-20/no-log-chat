import { Stack, Text } from '@mantine/core';
import Styles from './timeline.module.scss';
import { useTimelineAtom } from '@/components/atoms/timeline';

export const Timeline: React.FC = () => {
  const timelineContents = useTimelineAtom();
  return (
    <Stack>
      {timelineContents.map((timelineContent) => (
        <div key={timelineContent.ts} className={Styles['timeline-content']}>
          <Text fw="bold" color="dark" sx={{ wordBreak: 'break-all' }}>
            {timelineContent.author}
          </Text>
          <Text sx={{ wordBreak: 'break-all' }}>{timelineContent.text}</Text>
        </div>
      ))}
    </Stack>
  );
};
