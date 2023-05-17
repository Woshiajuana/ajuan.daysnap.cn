import type { BlogItem } from '@/types'
import { ArticleCell } from './Cell'

export interface ArticleListProps {
  articles: BlogItem[]
}

export function ArticleList(props: ArticleListProps) {
  const { articles } = props

  return (
    <ul>
      {articles.map((item) => (
        <ArticleCell key={item.id} article={item} />
      ))}
    </ul>
  )
}
