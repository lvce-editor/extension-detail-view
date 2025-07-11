import type { VirtualDomNode } from '../VirtualDomNode/VirtualDomNode.ts'
import * as Assert from '../Assert/Assert.ts'
import { getScrollToTopVirtualDom } from '../GetScrollToTopVirtualDom/GetScrollToTopVirtualDom.ts'
import * as MarkdownWorker from '../MarkdownWorker/MarkdownWorker.ts'

interface MarkdownOptions {
  readonly scrollToTopEnabled?: boolean
}

export const getMarkdownVirtualDom = async (html: string, options?: MarkdownOptions): Promise<readonly VirtualDomNode[]> => {
  Assert.string(html)
  const dom = await MarkdownWorker.getVirtualDom(html)
  const newDom = [...dom]
  if (options?.scrollToTopEnabled) {
    newDom[0].childCount++
    const extraDom = getScrollToTopVirtualDom(true)
    newDom.splice(1, 0, ...extraDom)
  }
  return newDom
}
