import type { GetServerSideProps, InferGetServerSidePropsType } from 'next'
import { BlogItem } from '@/types'
import { reqArticleList } from '@/api'
import { ArticleList, Pagination, SEO } from '@/components'

export interface HomePageProps {
  articles: BlogItem[]
  page: number
  size: number
  total: number
}

export const getServerSideProps: GetServerSideProps<HomePageProps> = async (
  context,
) => {
  const size = 2
  let { page = '1', category = '' } = context.query as Record<string, any>
  page = parseInt(page)

  const { list } = await reqArticleList()
  const data = list.filter((item) => !category || item.category === category)
  const total = data.length
  const articles = data.slice((page - 1) * size, page * size)

  return {
    props: {
      articles,
      total,
      page,
      size,
    },
  }
}

export default function BlogPage(
  props: InferGetServerSidePropsType<typeof getServerSideProps>,
) {
  const { articles, total, size } = props

  return (
    <>
      <SEO title="博客 👏" />

      <div className="py-20">
        <ArticleList articles={articles} />
        <Pagination total={total} size={size} />
      </div>
    </>
  )
}
