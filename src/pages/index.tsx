import { Stack, Transition } from '@mantine/core';
import type { NextPage } from 'next';
import Head from 'next/head';
import { useState } from 'react';
import { ConnectionPanel } from '@/components/ConnectionPanel/ConnectionPanel';
import { InputArea } from '@/components/InputArea/InputArea';
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
      <Head>
        <title>Home</title>
      </Head>

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
        </main>
      </div>
    </>
  );
};

export default Home;
