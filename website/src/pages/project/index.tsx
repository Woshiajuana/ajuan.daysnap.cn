import { SEO, ProjectList, Pagination } from '@/components'

export default function ProjectPage() {
  return (
    <>
      <SEO title="项目 👏" />

      <div className="py-6">
        <ProjectList />
        <Pagination total={10} size={2} />
      </div>
    </>
  )
}
