import MarkdownIt from 'markdown-it'
import hljs from 'highlight.js'
import anchorPlugin from 'markdown-it-anchor'
import tocPlugin from 'markdown-it-table-of-contents'
import uslug from 'uslug'

const uslugify = (s: string) => uslug(s)

// markdown-it docs see https://markdown-it.docschina.org/
export const markdown = new MarkdownIt({
  html: true,
  linkify: true,
  typographer: true,
  highlight(str, lang) {
    // https://github.com/highlightjs/highlight.js/issues/2277
    if (lang && hljs.getLanguage(lang)) {
      const { value } = hljs.highlight(str, {
        language: lang,
        ignoreIllegals: true,
      })
      const html = value
        .split(/\n/)
        .map((item, index) => {
          return `<div data-line="${index}">${item}</div>`
        })
        .join('')
      return `<pre>${html}</pre>`
    }

    return ''
  },
})
  .use(anchorPlugin, {
    slugify: uslugify,
    permalink: true,
    permalinkBefore: true,
    permalinkSymbol: '',
  })
  .use(tocPlugin)
