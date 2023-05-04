import { DocSearchBox } from './DocSearchBox'
import { Navbar } from './Navbar'
import { Logo } from './Logo'
import { MobileMenu } from './MobileMenu'
import { ThemeToggle } from './ThemeToggle'

export function Header() {
  return (
    <header className="flex items-center h-16 px-4">
      <Logo />

      <DocSearchBox />

      <Navbar />

      <ThemeToggle className="hidden sm:flex" />

      <MobileMenu />
    </header>
  )
}
