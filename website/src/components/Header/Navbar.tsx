import Link from 'next/link'
import { motion } from 'framer-motion'
import { useRouter } from 'next/router'
import classnames from 'classnames'

function NavbarLink({ children, href }: { children: any; href: string }) {
  const { pathname } = useRouter()
  const active = pathname === href

  return (
    <Link
      className={classnames(
        `relative px-4 h-9 transition-all flex items-center justify-center`,
        active ? 'text-primary' : 'text-regular-color',
      )}
      href={href}
    >
      {children}
      {active ? (
        <motion.div
          className="absolute inset-0 bg-gray-400/20 dark:bg-neutral-800 rounded-md z-[-1] bg-primary/10"
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
