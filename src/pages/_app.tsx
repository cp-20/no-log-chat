import 'ress';
import '@/styles/global.scss';
import { MantineProvider } from '@mantine/core';
import type { AppProps } from 'next/app';
import { GoogleTagManager } from '@/components/Injection/GoogleTagManager';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <GoogleTagManager />

      <MantineProvider
        withGlobalStyles
        withNormalizeCSS
        theme={{
          /** Put your mantine theme override here */
          colorScheme: 'light',
          breakpoints: {
            xs: 360,
            sm: 800,
            md: 1000,
            lg: 1200,
            xl: 1400,
          },
        }}
      >
        <Component {...pageProps} />
      </MantineProvider>
    </>
  );
}

export default MyApp;
