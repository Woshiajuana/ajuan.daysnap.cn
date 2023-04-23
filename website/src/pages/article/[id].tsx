import { useEffect } from 'react'
import Head from 'next/head'
import { GetServerSideProps, InferGetServerSidePropsType } from 'next'
import copy from 'copy-to-clipboard'
import { reqArticleInfo } from '@/curl'
import { ArticleItem } from '@/types'
import { Aside, Catalog } from '@/components'

export interface ArticlePageProps {
  article: ArticleItem
}

export const getServerSideProps: GetServerSideProps<
  ArticlePageProps,
  { id: string }
> = async (context) => {
  const { params } = context

  const article = await reqArticleInfo({
    id: params?.id ?? '',
  })

  return { props: { article } }
}

export default function ArticlePage(
  props: InferGetServerSidePropsType<typeof getServerSideProps>,
) {
  const { article } = props

  // 复制
  useEffect(() => {
    const container = document.querySelector<HTMLDivElement>(
      '#bee-article-content',
    )
    let timer: number | null = null
    const handler = (event: MouseEvent) => {
      const target = event.target as HTMLDivElement
      if (!target.classList.contains('language-js')) {
        return
      }
      if (timer) {
        return
      }
      const content = target.innerText
      if (copy(content)) {
        target.classList.add('code-copy-success')
        timer = window.setTimeout(() => {
          target.classList.remove('code-copy-success')
          timer = null
        }, 1400)
      }
    }
    container?.addEventListener('click', handler)
    return () => {
      container?.removeEventListener('click', handler)
    }
  }, [])

  return (
    <>
      <Head>
        <title>{article.title} - Bee</title>
      </Head>
      <article className="prose prose-indigo flex-1 pt-6 w-full">
        <header>
          <h1>{article.title}</h1>
          <time>{article.date}</time>
        </header>
        <div
          id="bee-article-content"
          dangerouslySetInnerHTML={{
            __html: article.content,
          }}
        />
      </article>
      <Aside>
        <Catalog />
      </Aside>
    </>
  )
}
