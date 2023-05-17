import type { BlogItem } from '@/types'
import { BlogCell } from './Cell'

export interface BlogListProps {
  list: BlogItem[]
}

export function BlogList(props: BlogListProps) {
  const { list } = props

  return (
    <ul>
      {list.map((item) => (
        <BlogCell key={item.id} blog={item} />
      ))}
    </ul>
  )
}
