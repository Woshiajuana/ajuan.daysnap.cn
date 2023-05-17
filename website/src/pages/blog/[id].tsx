import { GetServerSideProps, InferGetServerSidePropsType } from 'next'
import { reqArticleInfo } from '@/api'
import { BlogItem } from '@/types'
import { Aside, Catalog, ArticleContent, SEO } from '@/components'

export interface ArticlePageProps {
  article: BlogItem
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

      <div className="flex items-start pt-10 sm:pt-20">
        <article className="flex-1 overflow-hidden">
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
      </div>
    </>
  )
}
