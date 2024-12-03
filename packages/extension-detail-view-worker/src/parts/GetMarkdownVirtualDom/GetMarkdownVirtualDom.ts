import * as AllowedMarkdownAttributes from '../AllowedMarkdownAttributes/AllowedMarkdownAttributes.ts'
import * as Assert from '../Assert/Assert.ts'
import * as ParseHtml from '../ParseHtml/ParseHtml.ts'

export const getMarkdownVirtualDom = (html: string): any => {
  Assert.string(html)
  const dom = ParseHtml.parseHtml(html, AllowedMarkdownAttributes.allowedMarkdownAttributes)
  return dom
}
