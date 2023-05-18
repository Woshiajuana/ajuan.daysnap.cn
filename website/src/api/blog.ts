import matter from 'gray-matter'
import { curl, BASE_URL } from '@/api/curl'
import type { BlogItem, PagingResult } from '@/types'
import { markdown } from '@/utils'

// 获取文章列表
export const reqBlogList = () =>
  curl<PagingResult<BlogItem>>(`assets/mocks/blogs.json?v=${Date.now()}`)

// 获取文章详情
export const reqBlogInfo = async (params: { id: string }) => {
  const { list } = await reqBlogList()

  const article = list.find((item) => item.id === params.id)!

  const result = await fetch(
    `${BASE_URL}assets/blogs${article.url}?v=${Date.now()}`,
  ).then((res) => res.text())

  const { content } = matter(result)
  article.content = markdown.render(content)

  return article
}
