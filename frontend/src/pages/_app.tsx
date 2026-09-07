import type { AppProps } from 'next/app';
import Head from 'next/head';
import AppLayout from '@/components/layout/AppLayout';
import '@/styles/globals.css';
import { useEffect } from 'react';
import { initErrorReporter } from '@/lib/errorReporter';

export default function App({ Component, pageProps }: AppProps) {
  useEffect(() => {
    initErrorReporter();
  }, []);

  return (
    <>
      <Head>
        <title>Lumivox</title>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap" rel="stylesheet" />
      </Head>
      <AppLayout>
        <Component {...pageProps} />
      </AppLayout>
    </>
  );
}