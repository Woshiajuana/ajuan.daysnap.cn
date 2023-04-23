import matter from 'gray-matter'
import { curl, BASE_URL } from '@/curl/curl'
import { ArticleItem, CategoryItem, PagingResult } from '@/types'
import { markdown } from '@/utils'

// 获取分类列表
export const reqCategoryList = () =>
  curl<CategoryItem[]>(`assets/mocks/categories.json?v=${Date.now()}`)

// 获取文章列表
export const reqArticleList = () =>
  curl<PagingResult<ArticleItem>>(`assets/mocks/articles.json?v=${Date.now()}`)

// 获取文章详情
export const reqArticleInfo = async (params: { id: string }) => {
  const { list } = await reqArticleList()

  const article = list.find((item) => item.id === params.id)!

  const result = await fetch(
    `${BASE_URL}assets/articles${article.url}?v=${Date.now()}`,
  ).then((res) => res.text())

  const { content } = matter(result)
  article.content = markdown.render(content)

  return article
}
