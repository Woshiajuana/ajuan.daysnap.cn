import type { GetServerSideProps, InferGetServerSidePropsType } from 'next'
import { reqBlogInfo } from '@/api'
import type { BlogItem } from '@/types'
import { Aside, Catalog, ArticleContent, SEO, DateTime } from '@/components'

export interface BlogInfoPageProps {
  blog: BlogItem
}

export const getServerSideProps: GetServerSideProps<
  BlogInfoPageProps,
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

      <div className="flex items-start">
        <article className="w-full">
          <header className="mb-10">
            <h1 className="text-primary-color text-4xl">{blog.title}</h1>
            <DateTime
              className="mt-2"
              time={blog.createTime}
              template="YYYY/MM/DD hh:mm"
            />
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
