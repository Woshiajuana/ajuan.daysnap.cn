import type { GetServerSideProps, InferGetServerSidePropsType } from 'next'
import type { BlogItem } from '@/types'
import { reqBlogList } from '@/api'
import { BlogList, Pagination, SEO } from '@/components'

export interface BlogPageProps {
  blogs: BlogItem[]
  page: number
  size: number
  total: number
}

export const getServerSideProps: GetServerSideProps<BlogPageProps> = async (
  context,
) => {
  const size = 2
  let { page = '1' } = context.query as Record<string, any>
  page = parseInt(page)

  const { list } = await reqBlogList()
  const total = list.length
  const blogs = list.slice((page - 1) * size, page * size)

  return {
    props: {
      blogs,
      total,
      page,
      size,
    },
  }
}

export default function BlogPage(
  props: InferGetServerSidePropsType<typeof getServerSideProps>,
) {
  const { blogs, total, size } = props

  return (
    <>
      <SEO title="博客 👏" />

      <div className="py-20">
        <BlogList list={blogs} />
        <Pagination total={total} size={size} />
      </div>
    </>
  )
}
