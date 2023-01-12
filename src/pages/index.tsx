import { Stack, Transition } from '@mantine/core';
import type { NextPage } from 'next';
import { useState } from 'react';
import { ConnectionPanel } from '@/components/ConnectionPanel/ConnectionPanel';
import { Description } from '@/components/Description/Description';
import { InputArea } from '@/components/InputArea/InputArea';
import { MemberList } from '@/components/MemberList/MemberList';
import { Socials } from '@/components/Socials/Socials';
import { Timeline } from '@/components/Timeline/Timeline';
import { TitleHeader } from '@/components/TitleHeader/TitleHeader';
import { TweetButton } from '@/components/TweetButton/TweetButton';
import Styles from '@/styles/pages/index.module.scss';

type connectionState = 'CLOSE' | 'CONNECTING' | 'CONNECTED';

const Home: NextPage = () => {
  const [connectionState, setConnectionState] =
    useState<connectionState>('CLOSE');

  const connect = () => {
    setConnectionState('CONNECTING');

    setTimeout(() => setConnectionState('CONNECTED'), 200);
  };

  return (
    <>
      <Description />

      <div className={Styles['main-container']}>
        <main className={Styles.main}>
          <Transition
            mounted={connectionState === 'CONNECTED'}
            transition="fade"
            duration={200}
          >
            {(styles) => (
              <Stack style={styles}>
                <TitleHeader />
                <Timeline />
                <InputArea />
                <TweetButton />
              </Stack>
            )}
          </Transition>
          <Transition
            mounted={connectionState === 'CLOSE'}
            transition="fade"
            duration={200}
          >
            {(styles) => (
              <div style={styles}>
                <ConnectionPanel connect={connect} />
              </div>
            )}
          </Transition>
          <div className={Styles['member-list']}>
            <MemberList />
          </div>
        </main>
        <footer className={Styles.footer}>
          <Socials />
        </footer>
      </div>
    </>
  );
};

export default Home;
