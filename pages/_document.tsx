import {Head, Html, Main, NextScript} from 'next/document'

export default function MyDocument() {
  return (
    <Html className="bg-black text-xl lg:text-2xl subpixel-antialiased">
      <Head>
        <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
        <link
          rel="preload"
          href="/fonts/PPNeueMontreal-Medium.woff2"
          as="font"
          type="font/woff2"
          crossOrigin="anonymous"
        />
      </Head>

      <body>
        <Main />
        <NextScript />
        <GoatCounter />
      </body>
    </Html>
  )
}

function GoatCounter() {
  return (
    <script
      data-goatcounter="https://yenbekbay-com.goatcounter.com/count"
      async
      src="//gc.zgo.at/count.js"
    />
  )
}
