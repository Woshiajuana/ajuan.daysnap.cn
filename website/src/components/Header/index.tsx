import { DocSearchBox } from './DocSearchBox'
import { Navbar } from './Navbar'
import { Logo } from './Logo'
import { MobileMenu } from './MobileMenu'

export function Header() {
  return (
    <header className="flex items-center px-4 py-4">
      <Logo />

      <DocSearchBox />

      <Navbar />

      <MobileMenu />
    </header>
  )
}
