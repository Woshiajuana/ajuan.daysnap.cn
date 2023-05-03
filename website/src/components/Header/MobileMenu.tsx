import Link from 'next/link'
import classnames from 'classnames'
import { useRouter } from 'next/router'
import { HTMLAttributes, useState } from 'react'
import useDelayedRender from 'use-delayed-render'
import {
  Icon,
  Expanse,
  Button,
  Picture as PictureImg,
} from '@/components/commons'
import { ThemeToggle } from './ThemeToggle'
import styles from './index.module.scss'
import { useOverflow } from '@/hooks'

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
      <Button
        icon={menuVisible ? 'close' : 'menu'}
        aria-label="Toggle menu"
        text
        size={20}
        className="-mr-1.5 ml-2.5 w-10 lg:hidden"
        onClick={() => setMenuVisible((v) => !v)}
      />

      {isMenuMounted && (
        <div
          className={classnames(styles.menu, {
            [styles.isActive]: isMenuRendered,
          })}
        >
          <ul>
            <li className="px-4">
              <div className="flex items-center py-5 border-b border-secondary-color">
                <Button href="/login" aria-label="Login" className="mr-4">
                  登录
                </Button>
                <Button href="/register" aria-label="Register" className="mr-4">
                  注册
                </Button>
              </div>
            </li>
            <li
              className="text-regular-color"
              style={{ transitionDelay: subMenuVisible ? '125ms' : '25ms' }}
            >
              <div
                role="presentation"
                className="px-4 cursor-pointer"
                onClick={() => setSubMenuVisible((v) => !v)}
              >
                <div className="flex py-5 items-center border-b border-secondary-color">
                  <span className="w-14 h-14 box-border border rounded-full border-gray-300 cursor-pointer mr-4">
                    <PictureImg
                      className="rounded-full object-cover block w-full h-full"
                      alt="头像"
                    />
                  </span>
                  <div className="flex-1">
                    <h2 className="text-[16px]">Woshiajuan</h2>
                    <p className="text-[14px]">970703986@qq.com</p>
                  </div>
                  <Icon name={subMenuVisible ? 'arrow-up' : 'arrow-down'} />
                </div>
              </div>

              <Expanse show={subMenuVisible}>
                <ul
                  className={classnames(
                    'border-b border-secondary-color',
                    styles.lastLiNotBorder,
                  )}
                >
                  <MenuItem href="/" style={{ transitionDelay: '50ms' }}>
                    消息通知
                  </MenuItem>
                  <MenuItem href="/" style={{ transitionDelay: '75ms' }}>
                    个人中心
                  </MenuItem>
                  <MenuItem href="/" style={{ transitionDelay: '100ms' }}>
                    账号设置
                  </MenuItem>
                  <MenuItem href="/" style={{ transitionDelay: '125ms' }}>
                    安全退出
                  </MenuItem>
                </ul>
              </Expanse>
            </li>
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
