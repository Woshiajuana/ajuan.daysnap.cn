import MarkdownIt from 'markdown-it'
import hljs from 'highlight.js'
import anchor from 'markdown-it-anchor'
import uslug from 'uslug'

const uslugify = (s: string) => uslug(s)

// markdown-it docs see https://markdown-it.docschina.org/
export const markdown = new MarkdownIt({
  html: true,
  linkify: true,
  typographer: true,
  highlight(str, lang) {
    if (lang && hljs.getLanguage(lang)) {
      // https://github.com/highlightjs/highlight.js/issues/2277
      return hljs.highlight(str, { language: lang, ignoreIllegals: true }).value
    }

    return ''
  },
}).use(anchor, {
  slugify: uslugify,
  permalink: true,
  permalinkBefore: true,
  permalinkSymbol: '',
})
