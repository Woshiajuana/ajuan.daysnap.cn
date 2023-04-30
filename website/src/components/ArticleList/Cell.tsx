import Link from 'next/link'
import { ArticleItem } from '@/types'
import { DateTime } from '@/components'

export interface ArticleCellProps {
  article: ArticleItem
}

export function ArticleCell(props: ArticleCellProps) {
  const { article } = props
  const { id, title, abstract, date } = article

  return (
    <li className="mb-4">
      <Link
        className="block rounded bg-gray-100 dark:bg-neutral-800 p-4 transition duration-200 hover:outline-none hover:ring-2 hover:ring-neutral-400 focus:outline-none focus:ring-2 focus:ring-neutral-400"
        href={`/blog/${id}`}
      >
        <h2 className="text-xl leading-normal">{title}</h2>
        <div className="mb-4 text-xs font-medium tracking-wide mt-1">
          <DateTime time={date} template="YYYY/MM/DD hh:mm" />
        </div>
        <p className="text-sm leading-normal">{abstract}</p>
      </Link>
    </li>
  )
}
