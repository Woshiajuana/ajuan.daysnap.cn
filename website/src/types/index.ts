export interface CatalogItem {
  key: string
  label: string
  start: number
  end: number
  children: CatalogItem[]
}

export interface BlogItem {
  id: string
  title: string
  date: string
  url: string
  abstract: string

  // 详情才会有
  content: string
}

export interface ProjectItem {
  id: string
  title: string
  date: string
  url: string
  coverUrl: string

  // 详情才会有
  content: string
}

export interface ResponseData<T> {
  code: string
  data: T
  msg: string
}

export interface PagingParams<T = unknown> {
  pageIndex: number
  pageSize: number
}

export interface PagingResult<T = unknown> {
  total: number
  list: T[]
}
