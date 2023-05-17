import Link from 'next/link'
import classnames from 'classnames'
import { useRouter } from 'next/router'
import { type HTMLAttributes, useState } from 'react'
import useDelayedRender from 'use-delayed-render'
import { ThemeToggle } from './ThemeToggle'
import { useOverflow } from '@/hooks'
import { Icon } from '../Icon'
import classes from './index.module.scss'

interface MobileMenuProps extends HTMLAttributes<HTMLLIElement> {
  href: string
}

function MenuItem(props: MobileMenuProps) {
  const { href, children, ...rest } = props
  const { pathname } = useRouter()
  return (
    <li {...rest}>
      <Link
        href={href}
        className={classnames(
          'px-4 block text-[15px]',
          pathname === href
            ? 'text-primary'
            : 'text-regular-color hover:text-primary-color',
        )}
      >
        <span className="block py-5 border-b border-secondary-color">
          {children}
        </span>
      </Link>
    </li>
  )
}

export function MobileMenu() {
  const [visible, setVisible] = useState(false)
  const { mounted: isMenuMounted, rendered: isMenuRendered } = useDelayedRender(
    visible,
    {
      enterDelay: 20,
      exitDelay: 500,
    },
  )

  useOverflow({ visible })

  return (
    <>
      <button
        aria-label="Toggle menu"
        className="-mr-1.5 ml-2.5 w-9 h-9 flex items-center justify-center sm:hidden"
        onClick={() => setVisible((v) => !v)}
      >
        <Icon size={20} name={visible ? 'close' : 'menu'} />
      </button>

      {isMenuMounted && (
        <div
          className={classnames(classes.menu, {
            [classes.isActive]: isMenuRendered,
          })}
        >
          <ul>
            <MenuItem href="/" style={{ transitionDelay: '150ms' }}>
              首页
            </MenuItem>
            <MenuItem href="/blog" style={{ transitionDelay: '175ms' }}>
              博客
            </MenuItem>
            <MenuItem href="/project" style={{ transitionDelay: '200ms' }}>
              项目
            </MenuItem>
            <MenuItem href="/about" style={{ transitionDelay: '225ms' }}>
              关于我
            </MenuItem>
          </ul>
          <ThemeToggle className="fixed right-4 bottom-4" />
        </div>
      )}
    </>
  )
}
