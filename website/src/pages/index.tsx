import type { GetServerSideProps, InferGetServerSidePropsType } from 'next'
import { ArticleItem } from '@/types'
import { reqArticleList } from '@/curl'
import { ArticleList, SEO } from '@/components'
import Link from 'next/link'
import { ProjectList } from '@/components/Project/ProjectList'
import { websiteMetadata } from '@/utils'

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

      <section>
        <div>
          <div>
            <img src="/next.svg" alt="" />
          </div>
          <div>
            <h1>{websiteMetadata.title}</h1>
          </div>
        </div>
        <div>
          <p>
            Hello! I am Alan, a software developer and photographer based in
            Florida. I have a passion for learning and creating. Let&apos;s
            create something together!
          </p>
        </div>
      </section>

      <section>
        <div>
          <h2>最近文章</h2>
          <Link href="/">查看更多</Link>
        </div>
        <ArticleList articles={articles} />
      </section>

      <section>
        <div>
          <h2>最近项目</h2>
          <Link href="/">查看更多</Link>
        </div>
        <ProjectList />
      </section>
    </>
  )
}
