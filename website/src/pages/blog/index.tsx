import type { GetServerSideProps, InferGetServerSidePropsType } from 'next'
import { ArticleItem, CategoryItem } from '@/types'
import { reqArticleList, reqCategoryList } from '@/curl'
import { ArticleList, Aside, Category, Pagination, SEO } from '@/components'

export interface HomePageProps {
  categories: CategoryItem[]
  articles: ArticleItem[]
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

  const [categories, { list }] = await Promise.all([
    reqCategoryList(),
    reqArticleList(),
  ])

  const data = list.filter((item) => !category || item.category === category)
  const total = data.length
  const articles = data.slice((page - 1) * size, page * size)

  return {
    props: {
      categories,
      articles,
      total,
      page,
      size,
      category,
    },
  }
}

export default function BlogPage(
  props: InferGetServerSidePropsType<typeof getServerSideProps>,
) {
  const { categories, articles, total, size } = props

  return (
    <>
      <SEO title="博客 👏" />

      <div className="py-20">
        <ArticleList articles={articles} />
        <Pagination total={total} size={size} />

        <Aside>
          <Category categories={categories} />
        </Aside>
      </div>
    </>
  )
}
