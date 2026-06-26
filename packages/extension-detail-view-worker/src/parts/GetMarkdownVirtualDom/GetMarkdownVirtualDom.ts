import type { VirtualDomNode } from '../VirtualDomNode/VirtualDomNode.ts'
import * as AddMarkdownImageErrorHandlers from '../AddMarkdownImageErrorHandlers/AddMarkdownImageErrorHandlers.ts'
import * as Assert from '../Assert/Assert.ts'
import * as DomEventListenerFunctions from '../DomEventListenerFunctions/DomEventListenerFunctions.ts'
import { getScrollToTopVirtualDom } from '../GetScrollToTopVirtualDom/GetScrollToTopVirtualDom.ts'
import * as MarkdownWorker from '../MarkdownWorker/MarkdownWorker.ts'

interface MarkdownOptions {
  readonly scrollToTopEnabled?: boolean
}

export const getMarkdownVirtualDom = async (html: string, options?: MarkdownOptions): Promise<readonly VirtualDomNode[]> => {
  Assert.string(html)
  const dom = AddMarkdownImageErrorHandlers.addMarkdownImageErrorHandlers(await MarkdownWorker.getVirtualDom(html))
  if (options?.scrollToTopEnabled) {
    const [firstNode, ...rest] = dom
    const extraDom = getScrollToTopVirtualDom(true)
    return [
      {
        ...firstNode,
        childCount: firstNode.childCount + 1,
        onClick: DomEventListenerFunctions.HandleReadmeClick,
        onScroll: DomEventListenerFunctions.HandleReadmeScroll,
        onSelectionChange: DomEventListenerFunctions.HandleSelectionChange,
      },
      ...extraDom,
      ...rest,
    ]
  }
  return dom
}
