import type { GetServerSideProps, InferGetServerSidePropsType } from 'next'
import { reqBlogInfo } from '@/api'
import type { BlogItem } from '@/types'
import { Aside, Catalog, ArticleContent, SEO } from '@/components'

export interface ArticlePageProps {
  blog: BlogItem
}

export const getServerSideProps: GetServerSideProps<
  ArticlePageProps,
  { id: string }
> = async (context) => {
  const { params } = context

  const blog = await reqBlogInfo({
    id: params?.id ?? '',
  })

  return { props: { blog } }
}

export default function BlogInfoPage(
  props: InferGetServerSidePropsType<typeof getServerSideProps>,
) {
  const { blog } = props

  return (
    <>
      <SEO title={blog.title} />

      <div className="flex items-start pt-10 sm:pt-20">
        <article className="flex-1 overflow-hidden">
          <header className="mb-10">
            <h1 className="text-primary-color text-4xl">{blog.title}</h1>
            <p className="text-xs text-secondary-color mt-2">
              <time>{blog.date}</time>
            </p>
          </header>

          <ArticleContent html={blog.content} />
        </article>

        <Aside>
          <Catalog />
        </Aside>
      </div>
    </>
  )
}
