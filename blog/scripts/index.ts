import path from 'path'
import fs from 'fs-extra'
import glob from 'fast-glob'
import { normalizePath } from '@daysnap/utils'
import matter from 'gray-matter'
import { resolve } from './utils'

async function run(options: {
  input: string
  output: string
}) {
  const { input, output } = options
  const dirs = fs.readdirSync(input).reduce<Record<string, any>>((res, name) => (res[name] = 0, res), {})

  // 文章
  const articles = glob.sync(normalizePath(path.join(input, '**/*.md'))).map(filepath => {
    const buffer = fs.readFileSync(filepath)
    const data = matter(buffer).data as { date: string }
    const url = normalizePath(filepath.replace(input, ''))
    const [, category] = url.split('/')
    dirs[category]++
    return { ...data, url, category }
  })
  .sort((x, y) => {
    return new Date(x.date).getTime() - new Date(y.date).getTime()
  })

  // 目录
  const categories = Object.entries(dirs).map(([name, number]) => ({ name, number }))

  // gen json
  const genJson = (filename: string, data: any) => {
    fs.writeFileSync(path.join(output, filename), JSON.stringify({ code: 'S00000', data }, null, 2))
  }
  fs.ensureDirSync(output)
  genJson('articles.json', articles)
  genJson('categories.json', { total: categories.length, list: categories })
}

run({
  input: resolve('articles'),
  output: resolve('mocks'),
})
