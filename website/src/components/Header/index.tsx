import { DocSearchBox } from './DocSearchBox'
import { Navbar } from './Navbar'
import { Logo } from './Logo'

export function Header() {
  return (
    <header className="flex items-center px-4 py-4">
      <Logo />

      <DocSearchBox />

      <Navbar />
    </header>
  )
}
