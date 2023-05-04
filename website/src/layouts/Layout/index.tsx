import { ReactNode, useEffect } from 'react'
import { Footer, Header } from '@/components'
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

      <main className="mx-auto max-w-screen-md box-border px-4">
        {/* <Sidebar /> */}

        {children}
      </main>

      <Footer />
    </>
  )
}
