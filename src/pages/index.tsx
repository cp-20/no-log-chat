import type { NextPage } from 'next';
import Head from 'next/head';
import Styles from '@/styles/pages/index.module.scss';

const Home: NextPage = () => {
  return (
    <>
      <Head>
        <title>Home</title>
      </Head>
      <p className={Styles.text}>Hello World</p>
    </>
  );
};

export default Home;
