import Head from 'next/head'
import { websiteMetadata } from '@/utils'

export interface SEOProps {
  title: string
}

export function SEO(props: SEOProps) {
  const { title } = props

  return (
    <Head>
      <title>
        {title} - {websiteMetadata.title}
      </title>
      <meta name="robots" content="follow, index" />
    </Head>
  )
}
