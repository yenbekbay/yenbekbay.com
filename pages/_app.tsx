import type {AppProps} from 'next/app'
import Head from 'next/head'
import type {FallbackProps} from 'react-error-boundary'
import {ErrorBoundary} from 'react-error-boundary'
import '__generated__/tailwind.css'

export default function MyApp({Component, pageProps}: AppProps) {
  return (
    <>
      <Head>
        <title>Ayan Yenbekbay</title>
        <meta
          content="I'm Ayan, a full-stack software engineer based in Almaty, Kazakhstan."
          name="description"
        />
        <meta name="viewport" content="width=device-width,initial-scale=1" />
      </Head>

      <ErrorBoundary FallbackComponent={ErrorFallback}>
        <Component {...pageProps} />
      </ErrorBoundary>
    </>
  )
}

function ErrorFallback({error}: FallbackProps) {
  return (
    <main>
      <section className="flex flex-col py-28">
        <h1>Something went wrong!</h1>

        <pre className="alert alert-error items-start whitespace-pre-line font-mono">
          {error.message}
        </pre>
      </section>
    </main>
  )
}
