import Link from 'next/link'

function NavbarLink({ children, href }: { children: any; href: string }) {
  return (
    <Link
      className="relative py-[5px] px-[10px] transition-all hover:text-neutral-800 dark:hover:text-neutral-200 flex align-middle"
      href={href}
    >
      {children}
      <div
        className="absolute inset-0 bg-neutral-100 dark:bg-neutral-800 rounded-md z-[-1]"
        data-projection-id="1"
        style={{ transform: 'none', transformOrigin: '50% 50% 0px' }}
      ></div>
    </Link>
  )
}

export function Navbar() {
  return (
    <nav className="flex items-center">
      <NavbarLink href="/">首页</NavbarLink>
      <NavbarLink href="/blog">文章</NavbarLink>
      <NavbarLink href="/blog">项目</NavbarLink>
      <NavbarLink href="/about">关于</NavbarLink>
    </nav>
  )
}
