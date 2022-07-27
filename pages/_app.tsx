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
    <article className="prose-headings:font-display container prose prose-lg prose-neutral p-4 font-semibold leading-6 dark:prose-invert lg:p-6">
      <h1>Something went wrong!</h1>

      <pre className="items-start whitespace-pre-line rounded-md border border-red-600 bg-white font-mono text-red-600 dark:border-red-400 dark:bg-black dark:text-red-400">
        {error.message}
      </pre>
    </article>
  )
}
