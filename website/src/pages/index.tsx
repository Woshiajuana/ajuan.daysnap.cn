import type { GetServerSideProps, InferGetServerSidePropsType } from 'next'
import Image from 'next/image'
import type { BlogItem, ProjectItem } from '@/types'
import { reqBlogList, reqProjectList } from '@/api'
import { BlogList, Icon, SEO, ProjectList } from '@/components'
import Link from 'next/link'
import { websiteMetadata } from '@/utils'

export interface HomePageProps {
  blogs: BlogItem[]
  projects: ProjectItem[]
}

export const getServerSideProps: GetServerSideProps<
  HomePageProps
> = async () => {
  const [{ list: blogs }, { list: projects }] = await Promise.all([
    reqBlogList(),
    reqProjectList(),
  ])

  return {
    props: {
      blogs: blogs.slice(0, 3),
      projects: projects.slice(0, 3),
    },
  }
}

export default function HomePage(
  props: InferGetServerSidePropsType<typeof getServerSideProps>,
) {
  const { blogs, projects } = props

  return (
    <>
      <SEO title="首页 👏" />

      <section className="py-10">
        <div className="flex flex-col items-center justify-center space-x-0 space-y-4 sm:flex-row sm:space-x-8 sm:space-y-0">
          <div className="relative h-64 w-64 select-none overflow-hidden rounded-full bg-neutral-700 ring-2 ring-neutral-600 ring-offset-2 ring-offset-neutral-900 sm:h-40 sm:w-40">
            <Image
              alt="avatar"
              width="500"
              height="500"
              src={websiteMetadata.avatar}
            />
          </div>
          <div className="text-center sm:text-left">
            <h1 className="text-primary-color text-4xl">
              {websiteMetadata.title}
            </h1>
            <p className="text-regular-color mt-2">{websiteMetadata.name}</p>
            <p className="text-regular-color">{websiteMetadata.job}</p>
          </div>
        </div>
        <div className="flex items-center justify-center mt-12">
          <p
            className="w-full sm:max-w-xl text-regular-color"
            dangerouslySetInnerHTML={{ __html: websiteMetadata.introduce }}
          ></p>
        </div>
      </section>

      <section className="mt-10 sm:mt-20">
        <div className="flex items-baseline justify-between mb-4">
          <h2 className="text-primary-color text-2xl">最近文章</h2>
          <Link
            href="/blog"
            className="flex text-sm items-center group text-regular-color hover:text-primary-color transition-colors"
          >
            查看更多
            <Icon
              name="right-arrow"
              className="ml-2 group-hover:animate-bounce-x group-focus:animate-bounce-x"
            />
          </Link>
        </div>
        <BlogList list={blogs} />
      </section>

      <section className="mt-10 sm:mt-20">
        <div className="flex items-baseline justify-between mb-4">
          <h2 className="text-primary-color text-2xl">最近项目</h2>
          <Link
            href="/project"
            className="flex text-sm items-center group text-regular-color hover:text-primary-color transition-colors"
          >
            查看更多
            <Icon
              name="right-arrow"
              className="ml-2 group-hover:animate-bounce-x group-focus:animate-bounce-x"
            />
          </Link>
        </div>
        <ProjectList list={projects} />
      </section>
    </>
  )
}
