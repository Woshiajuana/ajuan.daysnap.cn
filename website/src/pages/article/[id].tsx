import Head from 'next/head'
import { GetServerSideProps, InferGetServerSidePropsType } from 'next'
import { reqArticleInfo } from '@/curl'
import { ArticleItem } from '@/types'
import { Aside, Catalog } from '@/components'

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

export default function ArticlePage(
  props: InferGetServerSidePropsType<typeof getServerSideProps>,
) {
  const { article } = props

  return (
    <>
      <Head>
        <title>{article.title} - Bee</title>
      </Head>
      <div className="prose prose-indigo flex-1 pt-6 w-full">
        <header>
          <h1>{article.title}</h1>
          <time>{article.date}</time>
        </header>
        <div
          id="bee-article-content"
          dangerouslySetInnerHTML={{
            __html: article.content,
          }}
        />
      </div>
      <Aside>
        <Catalog />
      </Aside>
    </>
  )
}
