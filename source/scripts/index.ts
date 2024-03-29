import path from 'path'
import fs from 'fs-extra'
import glob from 'fast-glob'
import { normalizePath } from '@daysnap/utils'
import matter from 'gray-matter'
import { resolve } from './utils'

async function run(options: {
  input: string
  output: string
  filename: string
}) {
  const { input, output, filename } = options
  // 文章
  const articles = glob.sync(normalizePath(path.join(input, '**/*.md'))).map(filepath => {
    const buffer = fs.readFileSync(filepath)
    const { createTime, updateTime, ...rest } = matter(buffer).data as { createTime: string, updateTime: string }
    const url = normalizePath(filepath.replace(input, ''))
    return { 
      ...rest,
      url, 
      createTime, 
      updateTime: updateTime ?? createTime,
      id: createTime ? new Date(createTime).getTime().toString() : Math.random().toString().slice(2)
    }
  }).sort((x, y) => {
    return new Date(y.createTime).getTime() - new Date(x.createTime).getTime()
  })

  const genJson = (filename: string, data: any) => {
    fs.writeFileSync(path.join(output, filename), JSON.stringify({ code: 'S00000', data }, null, 2))
  }

  fs.ensureDirSync(output)
  
  genJson(filename, { total: articles.length, list: articles })
}

// 博客文章
run({
  filename: 'blogs.json',
  input: resolve('blogs'),
  output: resolve('mocks'),
})

// 项目文章
run({
  filename: 'projects.json',
  input: resolve('projects'),
  output: resolve('mocks'),
})