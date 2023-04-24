export interface ArticleContentProps {
  html: string
}

export function ArticleContent(props: ArticleContentProps) {
  const { html } = props

  return (
    <div
      className="prose prose-neutral dark:prose-invert"
      id="bee-article-content"
      dangerouslySetInnerHTML={{
        __html: html,
      }}
    />
  )
}
