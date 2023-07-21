import Head from 'next/head'
import { websiteMetadata } from '@/utils'
import { useRouter } from 'next/router'

export interface SEOProps {
  title: string
  children?: any
}

export function SEO(props: SEOProps) {
  const { title, children } = props

  const router = useRouter()

  return (
    <Head>
      <title>
        {title ? `${title} - ${websiteMetadata.title}` : websiteMetadata.title}
      </title>
      <meta name="robots" content="follow, index" />
      <meta name="description" content={websiteMetadata.description} />
      <meta
        property="og:url"
        content={`${websiteMetadata.siteUrl}${router.asPath}`}
      />
      {children}
    </Head>
  )
}
