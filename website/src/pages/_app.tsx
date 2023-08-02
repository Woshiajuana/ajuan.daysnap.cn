import type { AppProps } from 'next/app'
import { ThemeProvider } from 'next-themes'
import { Layout } from '@/layouts'
import { setupNprogress } from '@/utils'
import '@/assets/scss/globals.scss'
import Head from 'next/head'

// 设置loading
setupNprogress()

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <meta charSet="utf-8" key="utf-8" />
        <meta httpEquiv="X-UA-Compatible" content="IE=edge" key="ie" />
        <meta
          name="viewport"
          content="width=device-width,initial-scale=1.0, minimum-scale=1.0, maximum-scale=1.0, user-scalable=no, viewport-fit=cover"
          key="viewport"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <ThemeProvider attribute="class">
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </ThemeProvider>
    </>
  )
}
