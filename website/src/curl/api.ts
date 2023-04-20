import { curl } from '@/curl/curl'
import { ArticleItem, CategoryItem, PagingResult } from '@/types'
import { BASE_URL } from '@/constants'

// 获取分类列表
export const reqCategoryList = () =>
  curl<CategoryItem[]>(`mocks/categories.json?v=${Date.now()}`)

// 获取文章列表
export const reqArticleList = () =>
  curl<PagingResult<ArticleItem>>(`mocks/articles.json?v=${Date.now()}`)

// 获取文章详情
export const reqArticleInfo = async (params: { id: string }) => {
  const { list } = await reqArticleList()

  const article = list.find((item) => item.id === params.id)!

  article.content = await fetch(
    `${BASE_URL}mocks/${article.path}?v=${Date.now()}`,
  ).then((res) => res.text())

  return article
}
