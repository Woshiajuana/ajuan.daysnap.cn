export interface ArticleContentProps {
  html: string
}

export function ArticleContent(props: ArticleContentProps) {
  const { html } = props

  return (
    <div
      // className="prose prose-neutral dark:prose-invert"
      className="prose prose-neutral dark:prose-invert max-w-none prose-headings:font-normal prose-h2:mb-4 prose-h2:mt-8 prose-h2:text-3xl prose-h3:mb-4 prose-h3:mt-8 prose-h3:text-xl prose-h4:mb-4 prose-h4:mt-8 prose-h4:text-xl prose-p:my-4 prose-strong:font-medium prose-strong:text-neutral-200"
      id="bee-article-content"
      dangerouslySetInnerHTML={{
        __html: html,
      }}
    />
  )
}
