import {RevealGroup, RevealGroupItem} from 'components/Reveal'
import {useFontLoaded} from 'hooks/useFontLoaded'

export default function Index() {
  const fontLoaded = useFontLoaded('Rumeur')
  if (!fontLoaded) {
    return null
  }
  return (
    <RevealGroup asChild>
      <article className="prose-headings:font-display container prose prose-lg prose-neutral p-4 font-semibold leading-6 prose-headings:font-bold prose-a:font-semibold dark:prose-invert lg:prose-2xl lg:p-6">
        <RevealGroupItem asChild>
          <p className="md:text-2xl lg:text-4xl">👋</p>
        </RevealGroupItem>

        <RevealGroupItem asChild>
          <p className="md:text-2xl lg:text-4xl">
            I'm Ayan, a full-stack software engineer based in Almaty,
            Kazakhstan.
          </p>
        </RevealGroupItem>

        <RevealGroupItem asChild>
          <p className="md:text-2xl lg:text-4xl">
            Let's get in touch! Follow me on{' '}
            <a
              href="https://instagram.com/yenbekbay"
              target="_blank"
              rel="noopener noreferrer">
              Instagram
            </a>{' '}
            or{' '}
            <a
              href="https://twitter.com/yenbekbay"
              target="_blank"
              rel="noopener noreferrer">
              Twitter
            </a>
            , or send me an{' '}
            <a
              href="mailto:ayan.yenb@gmail.com"
              target="_blank"
              rel="noopener noreferrer">
              email
            </a>
            .
          </p>
        </RevealGroupItem>
      </article>
    </RevealGroup>
  )
}
