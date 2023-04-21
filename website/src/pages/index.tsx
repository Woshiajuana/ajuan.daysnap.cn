import Head from 'next/head'
import type { GetServerSideProps, InferGetServerSidePropsType } from 'next'
import { ArticleItem, CategoryItem } from '@/types'
import { reqArticleList, reqCategoryList } from '@/curl'
import { ArticleList, Aside, Category, Pagination } from '@/components'
import { Copyright } from '@/components/Copyright'

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
  const size = 1
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

export default function HomePage(
  props: InferGetServerSidePropsType<typeof getServerSideProps>,
) {
  const { categories, articles, total, size } = props

  return (
    <>
      <Head>
        <title>首页 👏 - Bee Blog</title>
      </Head>
      <div className="flex-1 py-6">
        <ArticleList articles={articles} />
        <Pagination total={total} size={size} />
      </div>
      <Aside>
        <Category categories={categories} />
        <Copyright />
      </Aside>
    </>
  )
}
