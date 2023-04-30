import { DocSearchBox } from './DocSearchBox'
import { Navbar } from './Navbar'
import { Logo } from './Logo'

export function Header() {
  return (
    <header className="z-10 bg-clip-padding backdrop-blur-xl">
      <div className="flex items-center justify-between h-14 max-w-screen-md m-auto box-border px-4">
        <Logo />

        <DocSearchBox />

        <Navbar />
      </div>
    </header>
  )
}
