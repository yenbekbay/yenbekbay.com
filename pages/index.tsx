import {Article} from '#/components/Article'
import {RevealGroup, RevealGroupItem} from '#/components/Reveal'

export default function Index() {
  return (
    <RevealGroup asChild>
      <Article>
        <RevealGroupItem asChild>
          <p>Ayan Yenbekbay</p>
        </RevealGroupItem>

        <RevealGroupItem asChild>
          <p>
            Designer with a software engineering background.
            <br />
            Based in Almaty,&nbsp;Kazakhstan.
          </p>
        </RevealGroupItem>

        <RevealGroupItem asChild>
          <p>
            <a href="mailto:ayan@utility-first.co" target="_blank">
              Email
            </a>
            <br />
            <a href="https://t.me/yenbekbay" target="_blank">
              Telegram
            </a>
            <br />
            <a href="https://instagram.com/yenbekbay" target="_blank">
              Instagram
            </a>
          </p>
        </RevealGroupItem>
      </Article>
    </RevealGroup>
  )
}
