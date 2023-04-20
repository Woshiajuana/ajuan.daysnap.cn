import path from 'path'
import fs from 'fs'
import glob from 'fast-glob'
import { normalizePath } from '@daysnap/utils'
import matter from 'gray-matter'
import { resolve } from './utils'

async function run(input: string) {
  const dirs = fs.readdirSync(input).reduce<Record<string, any>>((res, name) => (res[name] = 0, res), {})

  // 文章
  const docs = glob.sync(normalizePath(path.join(input, '**/*.md'))).map(filepath => {
    const buffer = fs.readFileSync(filepath)
    const { data } = matter(buffer)
    const url = normalizePath(filepath.replace(input, ''))
    const [, category] = url.split('/')
    dirs[category]++
    return { ...data, url, category }
  }).sort((x, y) => {
    
  })

  // 目录
  const categories = Object.entries(dirs).map(([name, number]) => ({ name, number }))
}

run(resolve('articles'))
