import { useQuery } from '@/hooks'
import { PaginationButton } from './Button'
import { Icon } from '../Icon'

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
    <div className="flex items-center justify-between py-4 text-sm mt-6">
      <PaginationButton
        disabled={prevPage <= 0}
        href={{ pathname: '/blog', query: { ...rest, page: prevPage } }}
      >
        <Icon
          name="left-arrow"
          className="mr-2 group-hover:animate-bounce-x group-focus:animate-bounce-x"
        />
        上一页
      </PaginationButton>
      <span className="mx-4 text-secondary-color">
        <strong className="text-primary">{page}</strong> / {pageTotal}
      </span>
      <PaginationButton
        disabled={nextPage > pageTotal}
        href={{ pathname: '/blog', query: { ...rest, page: nextPage } }}
      >
        下一页
        <Icon
          name="right-arrow"
          className="ml-2 group-hover:animate-bounce-x group-focus:animate-bounce-x"
        />
      </PaginationButton>
    </div>
  )
}
