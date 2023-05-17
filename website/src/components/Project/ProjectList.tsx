import type { ProjectItem } from '@/types'
import { ProjectCell } from './ProjectCell'

export interface ProjectListProps {
  list: ProjectItem[]
}

export function ProjectList(props: ProjectListProps) {
  const { list } = props

  return (
    <ul className="grid grid-cols-1 sm:grid-cols-2 gap-x-4 gap-y-4">
      {list.map((item) => {
        return <ProjectCell key={item.id} project={item} />
      })}
    </ul>
  )
}
