import { websiteMetadata } from '@/utils'
import Link from 'next/link'

export function Logo() {
  return (
    <Link
      scroll={false}
      href="/"
      className="flex items-center text-lg mr-auto font-bold"
    >
      {websiteMetadata.title}
    </Link>
  )
}
