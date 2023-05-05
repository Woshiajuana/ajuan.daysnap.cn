import Image from 'next/image'
import Link from 'next/link'

export function ProjectCell() {
  return (
    <li className="group relative aspect-square overflow-hidden rounded transition duration-200 hover:outline-none hover:ring-2 hover:ring-neutral-400 focus:outline-none focus:ring-2 focus:ring-neutral-400">
      <Link href="/project/1">
        <Image
          alt="cover"
          width="500"
          height="500"
          src="https://picsum.photos/500/500"
        />
      </Link>
    </li>
  )
}
