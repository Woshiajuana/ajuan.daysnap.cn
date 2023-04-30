import Link from 'next/link'
import { useQuery } from '@/hooks'

export interface PaginationProps {
  total: number
  size: number
}

export function Pagination(props: PaginationProps) {
  const { total, size } = props
  const { page = '1', ...rest } = useQuery<{
    page?: string
    category: string
  }>()

  const prevPage = +page - 1
  const nextPage = +page + 1
  const pageTotal = Math.ceil(total / size)

  return (
    <div className="flex items-center justify-center py-4 text-sm">
      {prevPage > 0 && (
        <Link href={{ pathname: '/', query: { ...rest, page: prevPage } }}>
          上一页
        </Link>
      )}
      <span className="mx-4">
        <strong>{page}</strong>/{pageTotal}
      </span>
      {nextPage <= pageTotal && (
        <Link href={{ pathname: '/', query: { ...rest, page: nextPage } }}>
          下一页
        </Link>
      )}
    </div>
  )
}
