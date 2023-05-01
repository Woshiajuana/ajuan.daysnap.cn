import type { ReactNode } from 'react'
import { Footer, Header, Sidebar } from '@/components'

export interface LayoutProps {
  children?: ReactNode
}

export function Layout(props: LayoutProps) {
  const { children } = props

  return (
    <>
      <Header />

      <main className="flex mx-auto max-w-screen-md items-start box-border px-4">
        {/* <Sidebar /> */}

        {children}
      </main>

      <Footer />
    </>
  )
}
