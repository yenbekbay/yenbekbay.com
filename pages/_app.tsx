import {Article} from '#/components/Article'
import '#/styles/globals.css'
import type {AppProps} from 'next/app'
import Head from 'next/head'
import React from 'react'
import type {FallbackProps} from 'react-error-boundary'
import {ErrorBoundary} from 'react-error-boundary'

export default function MyApp({Component, pageProps}: AppProps) {
  const [fontsReady, setFontsReady] = React.useState(false)
  React.useEffect(() => {
    if (typeof document !== 'undefined') {
      document.fonts.ready.finally(() => setFontsReady(true))
    }
  }, [])
  return (
    <>
      <Head>
        <title>Ayan Yenbekbay</title>
        <meta
          content="Ayan Yenbekbay is a software engineer based in Almaty, Kazakhstan."
          name="description"
        />
        <meta name="viewport" content="width=device-width,initial-scale=1" />
      </Head>

      <ErrorBoundary FallbackComponent={ErrorFallback}>
        {fontsReady && <Component {...pageProps} />}
      </ErrorBoundary>
    </>
  )
}

function ErrorFallback({error}: FallbackProps) {
  return (
    <Article>
      <h1>Something went wrong!</h1>
      <pre>{error.message}</pre>
    </Article>
  )
}
