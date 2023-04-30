import Link from 'next/link'

export function Navbar() {
  return (
    <nav>
      <Link href="/">首页</Link>
      <Link href="/blog">博客</Link>
      <Link href="/about">关于我</Link>
      <Link href="/contact">联系我</Link>
    </nav>
  )
}
