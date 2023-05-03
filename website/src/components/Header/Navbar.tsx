import Link from 'next/link'
import { motion } from 'framer-motion'
import { useRouter } from 'next/router'

function NavbarLink({ children, href }: { children: any; href: string }) {
  const { pathname } = useRouter()

  return (
    <Link
      className="relative px-3 h-8 transition-all text-gray-400 hover:text-neutral-800 dark:hover:text-neutral-200 flex items-center justify-center"
      href={href}
    >
      {children}
      {pathname === href ? (
        <motion.div
          className="absolute inset-0 bg-gray-200 dark:bg-neutral-800 rounded-md z-[-1]"
          layoutId="navbar"
          transition={{
            type: 'spring',
            stiffness: 350,
            damping: 30,
          }}
        />
      ) : null}
    </Link>
  )
}

export function Navbar() {
  return (
    <nav className="flex items-center ml-4">
      <NavbarLink href="/">首页</NavbarLink>
      <NavbarLink href="/blog">博客</NavbarLink>
      <NavbarLink href="/project">项目</NavbarLink>
      <NavbarLink href="/about">关于我</NavbarLink>
    </nav>
  )
}
