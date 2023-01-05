import type { NextPage } from 'next';
import Head from 'next/head';
import { InputArea } from '@/components/InputArea/InputArea';
import { Timeline } from '@/components/Timeline/Timeline';
import Styles from '@/styles/pages/index.module.scss';

const Home: NextPage = () => {
  return (
    <>
      <Head>
        <title>Home</title>
      </Head>

      <div className={Styles['main-container']}>
        <main className={Styles.main}>
          <Timeline />
          <InputArea />
        </main>
      </div>
    </>
  );
};

export default Home;
