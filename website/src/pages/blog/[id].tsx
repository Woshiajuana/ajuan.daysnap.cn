import { GetServerSideProps, InferGetServerSidePropsType } from 'next'
import { reqArticleInfo } from '@/curl'
import { ArticleItem } from '@/types'
import { Aside, Catalog, ArticleContent, SEO } from '@/components'

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
      <SEO title={article.title} />

      <article className="pt-10 sm:pt-20 w-full">
        <header className="mb-10">
          <h1 className="text-primary-color text-4xl">{article.title}</h1>
          <p className="text-xs text-secondary-color mt-2">
            <time>{article.date}</time>
          </p>
        </header>

        <ArticleContent html={article.content} />
      </article>

      <Aside>
        <Catalog />
      </Aside>
    </>
  )
}
