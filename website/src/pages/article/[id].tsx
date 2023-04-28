import { useEffect } from 'react'
import Head from 'next/head'
import { GetServerSideProps, InferGetServerSidePropsType } from 'next'
import copy from 'copy-to-clipboard'
import { reqArticleInfo } from '@/curl'
import { ArticleItem } from '@/types'
import { Aside, Catalog, ArticleContent } from '@/components'

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

  // 复制 or 展开/收起
  useEffect(() => {
    const container = document.querySelector<HTMLDivElement>(
      '#bee-article-content',
    )
    const handler = (event: MouseEvent) => {
      const target = event.target as HTMLDivElement

      // 复制
      if (target.classList.contains('code-copy-btn')) {
        if (target.classList.contains('is-success')) {
          return
        }
        const content = (
          target.parentElement?.parentElement?.querySelector(
            '.code-block-content',
          ) as HTMLElement
        )?.innerText
        if (copy(content)) {
          target.classList.add('is-success')
          target.classList.add('bee-success')
          target.classList.remove('bee-copy')
          window.setTimeout(() => {
            target.classList.remove('is-success')
            target.classList.remove('bee-success')
            target.classList.add('bee-copy')
          }, 1000)
        }
      }

      // 展开/收起
      if (target.classList.contains('code-arrow-btn')) {
        target.parentElement?.parentElement?.classList.toggle('is-collapsed')
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

      <article className="flex-1 pt-6 w-full overflow-hidden">
        <header>
          <h1>{article.title}</h1>
          <time>{article.date}</time>
        </header>

        <ArticleContent html={article.content} />
      </article>

      <Aside>
        <Catalog />
      </Aside>
    </>
  )
}
