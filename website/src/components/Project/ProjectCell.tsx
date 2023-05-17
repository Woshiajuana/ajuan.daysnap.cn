import type { ProjectItem } from '@/types'
import Image from 'next/image'
import Link from 'next/link'

export interface ProjectCellProps {
  project: ProjectItem
}

export function ProjectCell(props: ProjectCellProps) {
  const { project } = props
  const { id, title, date, coverUrl } = project

  return (
    <li className="group relative aspect-square overflow-hidden rounded transition duration-200 hover:outline-none hover:ring-2 hover:ring-neutral-400 focus:outline-none focus:ring-2 focus:ring-neutral-400 bg-regular-color">
      <Link href={`/project/${id}`} className="relative block w-full h-full">
        <Image alt="cover" width="640" height="640" src={coverUrl} />
        <span className="absolute right-1 top-1 rounded bg-neutral-800/90 px-2.5 py-0.5 text-sm uppercase tracking-wide text-neutral-200 shadow backdrop-blur backdrop-filter">
          {date}
        </span>
        <div className="absolute inset-x-0 bottom-0 rounded-b bg-neutral-800/90 p-4 backdrop-blur backdrop-filter">
          <p id="work-heading-preferify" className="text-xl text-neutral-200">
            {title}
          </p>
        </div>
      </Link>
    </li>
  )
}
