import Link from 'next/link'

export function Navbar() {
  return (
    <nav>
      <Link href="/">首页</Link>
      <Link href="/blog">文章</Link>
      <Link href="/blog">项目</Link>
      <Link href="/about">关于</Link>
    </nav>
  )
}
