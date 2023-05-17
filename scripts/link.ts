import fs from 'fs'
import path from 'path'

const resolve = (...dir: string[]) => path.join(__dirname, '..', ...dir)
const target = resolve('./source/')
const linkPath = resolve('./website/public/assets')

if (!fs.existsSync(linkPath)) {
  fs.symlinkSync(target, linkPath, 'dir')
}
