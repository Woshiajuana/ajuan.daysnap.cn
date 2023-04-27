import MarkdownIt from 'markdown-it'
import hljs from 'highlight.js'
import anchorPlugin from 'markdown-it-anchor'
import tocPlugin from 'markdown-it-table-of-contents'
import uslug from 'uslug'

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
      const lines = value.split(/\n/)
      // lines.splice(-1)
      const rawCode = lines
        .map((item, index) => {
          return `<div data-line="${index}">${item}</div>`
        })
        .join('')
      return value
    }
    return ''
  },
})
  .use(anchorPlugin, {
    slugify: uslug,
    permalink: true,
    permalinkBefore: true,
    permalinkSymbol: '',
  })
  .use(tocPlugin)
  .use((md) => {
    const fence = md.renderer.rules.fence!
    md.renderer.rules.fence = (...args) => {
      const [tokens, idx] = args
      const { info, content } = tokens[idx]
      const rawCode = fence(...args)

      const blocks = content.split(/\n/)
      blocks.splice(-1)

      const lines = blocks
        .map((item, index) => `<span class="code-block-line">${index}</span>`)
        .join('')

      return `
        <div class="code-block">
          <div class="code-block-menu">
            <button class="code-block-btn">
              <i class="bee-icon bee-arrow"></i>
            </button>
            <span class="code-lang">${info}</span>
            <button class="code-block-btn">复制</button>
          </div>
          <div class="code-block-inner">
            <div class="code-block-line-groups">${lines}</div>
            <div class="code-block-content">${rawCode}</div>
          </div>
        </div>
      `
    }
  })
