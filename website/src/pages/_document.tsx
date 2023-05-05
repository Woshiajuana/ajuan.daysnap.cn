import { Html, Head, Main, NextScript } from 'next/document'

export default function Document() {
  return (
    <Html lang="zh">
      <Head>
        <meta
          name="viewport"
          content="width=device-width,initial-scale=1"
          key="viewport"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <body className="bg-primary-color">
        <Main />
        <NextScript />
      </body>
    </Html>
  )
}
