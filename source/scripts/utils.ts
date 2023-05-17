import path from 'path'

export const resolve = (...dirs: string[]) => path.join(__dirname, '..', ...dirs)
