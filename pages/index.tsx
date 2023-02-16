import {Article} from '#/components/Article'
import {RevealGroup, RevealGroupItem} from '#/components/Reveal'

export default function Index() {
  return (
    <RevealGroup asChild>
      <Article>
        <RevealGroupItem asChild>
          <p>
            Ayan Yenbekbay is a software engineer based in Almaty, Kazakhstan.
          </p>
        </RevealGroupItem>

        <RevealGroupItem asChild>
          <p>
            He specializes in digital products across the web and mobile
            platforms, striving for beautiful execution and great user
            experience. Through his practice,{' '}
            <a href="https://utility-first.co" target="_blank">
              Utility First
            </a>
            , he collaborates with a passionate net of talent, delivering
            complete solutions for clients around the world.
          </p>
        </RevealGroupItem>

        <RevealGroupItem asChild>
          <p>
            <a href="mailto:ayan.yenb@gmail.com" target="_blank">
              Email
            </a>
            <br />
            <a href="https://instagram.com/yenbekbay" target="_blank">
              Instagram
            </a>
            <br />
            <a href="https://twitter.com/yenbekbay" target="_blank">
              Twitter
            </a>
            <br />
          </p>
        </RevealGroupItem>
      </Article>
    </RevealGroup>
  )
}
