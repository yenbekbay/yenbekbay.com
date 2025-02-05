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
            Software engineer and communication designer in Almaty, Kazakhstan.
          </p>
        </RevealGroupItem>

        <RevealGroupItem asChild>
          <p>
            <a href="https://instagram.com/yenbekbay" target="_blank">
              Instagram
            </a>
            <br />
            <a href="mailto:ayan.yenb@gmail.com" target="_blank">
              Email
            </a>
            <br />
            <a href="https://t.me/yenbekbay" target="_blank">
              Telegram
            </a>
          </p>
        </RevealGroupItem>
      </Article>
    </RevealGroup>
  )
}
