import { websiteMetadata } from '@/utils'
import Link from 'next/link'
import classes from './index.module.scss'

export function Logo() {
  return (
    <Link
      scroll={false}
      href="/"
      data-content={websiteMetadata.title.toLocaleUpperCase()}
      className={classes.logo}
    >
      {websiteMetadata.title.toLocaleUpperCase()}
    </Link>
  )
}
