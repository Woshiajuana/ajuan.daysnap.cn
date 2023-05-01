import type { GetServerSideProps, InferGetServerSidePropsType } from 'next'
import { ArticleItem } from '@/types'
import { reqArticleList } from '@/curl'
import { ArticleList, SEO } from '@/components'

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
      <SEO title="首页 👏" />

      <div className="flex-1 py-6">
        <ArticleList articles={articles} />
      </div>
    </>
  )
}
