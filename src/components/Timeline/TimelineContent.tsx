import { Text, Transition } from '@mantine/core';
import type { MantineTransitionStyles } from '@mantine/core/lib/Transition/transitions';
import { useEffect, useState } from 'react';
import Styles from './timeline.module.scss';
import { timeline } from '@/atoms/timeline';

const scaleY: MantineTransitionStyles = {
  in: {
    opacity: 1,
    maxHeight: '128px',
    minHeight: '80px',
    transform: 'scaleY(1)',
  },
  out: { opacity: 0, maxHeight: '0', minHeight: '0', transform: 'scaleY(0)' },
  common: { transformOrigin: 'bottom' },
  transitionProperty: 'opacity, transform, max-height, min-height',
};

type Props = { timeline: timeline; index: number };

export const TimelineContent: React.FC<Props> = ({ timeline, index }) => {
  const [visibility, setVisibility] = useState(false);

  useEffect(() => {
    if (index >= 3) {
      setVisibility(false);
    }
  }, [index]);

  useEffect(() => {
    setVisibility(true);
  }, []);

  return (
    <Transition mounted={visibility} transition={scaleY} duration={500}>
      {(styles) => (
        <div className={Styles['timeline-content']} style={styles}>
          <Text
            fw="bold"
            color="dark"
            lineClamp={1}
            sx={{ wordBreak: 'break-all' }}
          >
            {timeline.author}
          </Text>
          <Text sx={{ wordBreak: 'break-all' }} lineClamp={2}>
            {timeline.text}
          </Text>
        </div>
      )}
    </Transition>
  );
};
