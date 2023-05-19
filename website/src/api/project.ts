import matter from 'gray-matter'
import { curl, BASE_URL } from '@/api/curl'
import type { PagingResult, ProjectItem } from '@/types'
import { markdown } from '@/utils'

// 获取项目列表
export const reqProjectList = () =>
  curl<PagingResult<ProjectItem>>(`assets/mocks/projects.json?v=${Date.now()}`)

// 获取项目详情
export const reqProjectInfo = async (params: { id: string }) => {
  const { list } = await reqProjectList()

  const article = list.find((item) => item.id === params.id)!

  const result = await fetch(
    `${BASE_URL}assets/projects${article.url}?v=${Date.now()}`,
  ).then((res) => res.text())

  const { content, data } = matter(result)
  Object.assign(article, data, { content: markdown.render(content) })

  return article
}
