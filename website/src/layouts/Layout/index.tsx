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

      <main className="mx-auto max-w-screen-md box-border px-4">
        {/* <Sidebar /> */}

        {children}
      </main>

      <Footer />
    </>
  )
}
