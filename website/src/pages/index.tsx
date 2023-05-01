import Head from 'next/head'
import type { GetServerSideProps, InferGetServerSidePropsType } from 'next'
import { ArticleItem, CategoryItem } from '@/types'
import { reqArticleList, reqCategoryList } from '@/curl'
import { ArticleList, Aside, Category, Pagination } from '@/components'

export interface HomePageProps {
  articles: ArticleItem[]
}

export const getServerSideProps: GetServerSideProps<
  HomePageProps
> = async () => {
  const { list } = await reqArticleList()

  return {
    props: {
      articles: list.slice(0, 3),
    },
  }
}

export default function HomePage(
  props: InferGetServerSidePropsType<typeof getServerSideProps>,
) {
  const { articles } = props

  return (
    <>
      <Head>
        <title>首页 👏 - Bee Blog</title>
      </Head>

      <div className="flex-1 py-6">
        <ArticleList articles={articles} />
        <Pagination total={total} size={size} />
      </div>
    </>
  )
}
