import Link from 'next/link'
import { type BlogItem } from '@/types'
import { DateTime } from '@/components'

export interface BlogCellProps {
  blog: BlogItem
}

export function BlogCell(props: BlogCellProps) {
  const { blog } = props
  const { id, title, abstract, date } = blog

  return (
    <li className="mb-4 last:mb-0">
      <Link
        className="block rounded p-4 transition border border-regular-color box-border duration-200 hover:outline-none hover:ring-2 hover:ring-neutral-400 focus:outline-none focus:ring-2 focus:ring-neutral-400"
        href={`/blog/${id}`}
      >
        <h2 className="text-xl text-primary-color">{title}</h2>
        <DateTime className="mt-1" time={date} template="YYYY/MM/DD hh:mm" />
        <p className="mt-4 text-secondary-color">{abstract}</p>
      </Link>
    </li>
  )
}
