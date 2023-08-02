import Head from 'next/head'
import { websiteMetadata } from '@/utils'
import { useRouter } from 'next/router'

export interface SEOProps {
  title: string
  children?: any
}

export function SEO(props: SEOProps) {
  const { title: titleProp, children } = props

  const router = useRouter()

  const title = titleProp
    ? `${titleProp} - ${websiteMetadata.title}`
    : websiteMetadata.title

  const share = `${websiteMetadata.siteUrl}${websiteMetadata.avatar}`

  return (
    <Head>
      <title>{title}</title>
      <meta name="robots" content="follow, index" />
      <meta name="description" content={websiteMetadata.description} />
      <meta property="og:title" content={title} />
      <meta itemProp="image" content={share} />
      <meta property="og:description" content={websiteMetadata.description} />
      <meta
        property="og:url"
        content={`${websiteMetadata.siteUrl}${router.asPath}`}
      />
      {children}
    </Head>
  )
}
