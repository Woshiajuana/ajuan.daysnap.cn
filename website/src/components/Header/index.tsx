import Link from 'next/link'
import { SearchBox } from '@/components'

export function Header() {
  return (
    <header className="z-10 bg-clip-padding backdrop-blur-xl">
      <div className="flex items-center justify-between h-14 max-w-main m-auto box-border px-4">
        <Link scroll={false} href="/" className="flex items-center text-lg">
          Ajuan Blog
        </Link>

        <SearchBox />
      </div>
    </header>
  )
}
