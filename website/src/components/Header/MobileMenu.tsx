import Link from 'next/link'
import classnames from 'classnames'
import { useRouter } from 'next/router'
import { HTMLAttributes, useState } from 'react'
import useDelayedRender from 'use-delayed-render'
import { ThemeToggle } from './ThemeToggle'
import styles from './index.module.scss'
import { useOverflow } from '@/hooks'
import { Icon } from '../Icon'

interface MobileMenuProps extends HTMLAttributes<HTMLLIElement> {
  href: string
}
function MenuItem(props: MobileMenuProps) {
  const { href, children, ...rest } = props
  const { pathname } = useRouter()
  return (
    <li {...rest}>
      <Link href={href}>
        <a
          className={classnames(
            'px-4 block text-regular-color text-[15px] hover:text-primary-color',
            pathname === href ? '1' : '2',
          )}
        >
          <div className="py-5 border-b border-secondary-color">{children}</div>
        </a>
      </Link>
    </li>
  )
}

export function MobileMenu() {
  const [menuVisible, setMenuVisible] = useState(false)
  const { mounted: isMenuMounted, rendered: isMenuRendered } = useDelayedRender(
    menuVisible,
    {
      enterDelay: 20,
      exitDelay: 500,
    },
  )

  const [subMenuVisible, setSubMenuVisible] = useState(false)

  useOverflow({ visible: menuVisible })

  return (
    <>
      <button
        aria-label="Toggle menu"
        className="-mr-1.5 ml-2.5 w-10 lg:hidden"
        onClick={() => setMenuVisible((v) => !v)}
      >
        <Icon size={20} name={menuVisible ? 'close' : 'menu'} />
      </button>

      {isMenuMounted && (
        <div
          className={classnames(styles.menu, {
            [styles.isActive]: isMenuRendered,
          })}
        >
          <ul>
            <MenuItem href="/" style={{ transitionDelay: '150ms' }}>
              发现
            </MenuItem>
            <MenuItem href="/" style={{ transitionDelay: '175ms' }}>
              App下载
            </MenuItem>
            <MenuItem href="/" style={{ transitionDelay: '200ms' }}>
              关于我们
            </MenuItem>
            <MenuItem href="/" style={{ transitionDelay: '225ms' }}>
              帮助中心
            </MenuItem>
            <MenuItem href="/" style={{ transitionDelay: '250ms' }}>
              用户反馈
            </MenuItem>
          </ul>
          <ThemeToggle className="fixed right-4 bottom-4" />
        </div>
      )}
    </>
  )
}
