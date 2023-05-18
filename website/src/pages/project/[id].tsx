import type { GetServerSideProps, InferGetServerSidePropsType } from 'next'
import { reqProjectInfo } from '@/api'
import type { ProjectItem } from '@/types'
import { Aside, Catalog, ArticleContent, SEO } from '@/components'

export interface ProjectInfoPageProps {
  project: ProjectItem
}

export const getServerSideProps: GetServerSideProps<
  ProjectInfoPageProps,
  { id: string }
> = async (context) => {
  const { params } = context

  const project = await reqProjectInfo({
    id: params?.id ?? '',
  })

  return { props: { project } }
}

export default function BlogInfoPage(
  props: InferGetServerSidePropsType<typeof getServerSideProps>,
) {
  const { project } = props

  return (
    <>
      <SEO title={project.title} />

      <div className="flex items-start">
        <article className="w-full">
          <header className="mb-10">
            <h1 className="text-primary-color text-4xl">{project.title}</h1>
            <p className="text-xs text-secondary-color mt-2">
              <time>{project.date}</time>
            </p>
          </header>

          <ArticleContent html={project.content} />
        </article>

        <Aside>
          <Catalog />
        </Aside>
      </div>
    </>
  )
}
