import * as AllowedMarkdownAttributes from '../AllowedMarkdownAttributes/AllowedMarkdownAttributes.ts'
import * as Assert from '../Assert/Assert.ts'
import * as ParseHtml from '../ParseHtml/ParseHtml.ts'
import type { VirtualDomNode } from '../VirtualDomNode/VirtualDomNode.ts'

export const getMarkdownVirtualDom = (html: string): readonly VirtualDomNode[] => {
  Assert.string(html)
  const dom = ParseHtml.parseHtml(html, AllowedMarkdownAttributes.allowedMarkdownAttributes)
  return dom
}
