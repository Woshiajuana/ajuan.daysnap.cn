import { reqProjectList } from '@/api'
import { SEO, ProjectList, Pagination } from '@/components'
import type { ProjectItem } from '@/types'
import type { GetServerSideProps, InferGetServerSidePropsType } from 'next'

export interface ProjectPageProps {
  projects: ProjectItem[]
  page: number
  size: number
  total: number
}

export const getServerSideProps: GetServerSideProps<ProjectPageProps> = async (
  context,
) => {
  const size = 10
  let { page = '1' } = context.query as Record<string, any>
  page = parseInt(page)

  const { list } = await reqProjectList()
  const total = list.length
  const projects = list.slice((page - 1) * size, page * size)

  return {
    props: {
      projects,
      total,
      page,
      size,
    },
  }
}

export default function ProjectPage(
  props: InferGetServerSidePropsType<typeof getServerSideProps>,
) {
  const { projects, total, size } = props

  return (
    <>
      <SEO title="项目 👏" />

      <ProjectList list={projects} />

      <Pagination total={total} size={size} />
    </>
  )
}
