import Link from 'next/link'
import { DocSearchBox } from './DocSearchBox'
import { Navbar } from './Navbar'

export function Header() {
  return (
    <header className="z-10 bg-clip-padding backdrop-blur-xl">
      <div className="flex items-center justify-between h-14 max-w-main m-auto box-border px-4">
        <Link scroll={false} href="/" className="flex items-center text-lg">
          Ajuan Blog
        </Link>

        <Navbar />

        <DocSearchBox />
      </div>
    </header>
  )
}
