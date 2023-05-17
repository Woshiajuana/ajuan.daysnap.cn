import Link from 'next/link'
import { BlogItem } from '@/types'
import { DateTime } from '@/components'

export interface ArticleCellProps {
  article: BlogItem
}

export function ArticleCell(props: ArticleCellProps) {
  const { article } = props
  const { id, title, abstract, date } = article

  return (
    <li className="mb-4">
      <Link
        className="block rounded bg-regular-color p-4 transition duration-200 hover:outline-none hover:ring-2 hover:ring-neutral-400 focus:outline-none focus:ring-2 focus:ring-neutral-400"
        href={`/blog/${id}`}
      >
        <h2 className="text-xl leading-normal text-primary-color">{title}</h2>
        <div className="mb-4 text-xs font-medium tracking-wide mt-1 text-secondary-color">
          <DateTime time={date} template="YYYY/MM/DD hh:mm" />
        </div>
        <p className="text-sm leading-normal text-regular-color">{abstract}</p>
      </Link>
    </li>
  )
}
