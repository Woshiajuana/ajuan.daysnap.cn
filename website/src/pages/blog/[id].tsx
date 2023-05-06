import Head from 'next/head'
import { GetServerSideProps, InferGetServerSidePropsType } from 'next'
import { reqArticleInfo } from '@/curl'
import { ArticleItem } from '@/types'
import { Aside, Catalog, ArticleContent } from '@/components'

export interface ArticlePageProps {
  article: ArticleItem
}

export const getServerSideProps: GetServerSideProps<
  ArticlePageProps,
  { id: string }
> = async (context) => {
  const { params } = context

  const article = await reqArticleInfo({
    id: params?.id ?? '',
  })

  return { props: { article } }
}

export default function BlogInfoPage(
  props: InferGetServerSidePropsType<typeof getServerSideProps>,
) {
  const { article } = props

  return (
    <>
      <Head>
        <title>{article.title} - Bee</title>
      </Head>

      <article className="pt-6 w-full overflow-hidden">
        <header>
          <h1>{article.title}</h1>
          <time>{article.date}</time>
        </header>

        <ArticleContent html={article.content} />
      </article>

      <Aside>
        <Catalog />
      </Aside>
    </>
  )
}
