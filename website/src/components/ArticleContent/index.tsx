import copy from 'copy-to-clipboard'
import { useEffect } from 'react'

export interface ArticleContentProps {
  html: string
}

export function ArticleContent(props: ArticleContentProps) {
  const { html } = props

  // 复制 or 展开/收起
  useEffect(() => {
    const container = document.querySelector<HTMLDivElement>('#article-content')
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
          target.classList.add('me-success')
          target.classList.remove('me-copy')
          window.setTimeout(() => {
            target.classList.remove('is-success')
            target.classList.remove('me-success')
            target.classList.add('me-copy')
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
    <div
      // className="prose prose-neutral dark:prose-invert"
      className="prose prose-neutral dark:prose-invert max-w-none prose-h2:mb-4 prose-h2:mt-8 prose-h2:text-3xl prose-h3:mb-4 prose-h3:mt-8 prose-h3:text-xl prose-h4:mb-4 prose-h4:mt-8 prose-h4:text-xl prose-p:my-4 prose-strong:font-medium"
      id="article-content"
      dangerouslySetInnerHTML={{
        __html: html,
      }}
    />
  )
}
