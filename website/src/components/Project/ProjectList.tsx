import { ProjectCell } from './ProjectCell'

export function ProjectList() {
  return (
    <ul className="grid grid-cols-1 sm:grid-cols-2 gap-x-4 gap-y-4">
      {new Array(4).fill('').map((item, index) => {
        return <ProjectCell key={index} />
      })}
    </ul>
  )
}
