import { type ReactNode, useEffect } from 'react'
import { Footer, Header, Sidebar } from '@/components'
import { useTheme } from 'next-themes'

export interface LayoutProps {
  children?: ReactNode
}

export function Layout(props: LayoutProps) {
  const { children } = props

  // fix doc-search dark light theme
  const { resolvedTheme } = useTheme()
  useEffect(() => {
    if (resolvedTheme) {
      document.documentElement.setAttribute('data-theme', resolvedTheme)
    }
  }, [resolvedTheme])

  return (
    <>
      <Header />

      <main className="relative mx-auto max-w-screen-sm max-w-[680px] box-border px-4 py-10 sm:py-20">
        <Sidebar />

        {children}
      </main>

      <Footer />
    </>
  )
}
